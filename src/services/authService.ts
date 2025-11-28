import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as employeeModel from '../models/employeeModel';

const saltRounds = 10;

export const registerUser = async (name: string, email: string, role: string, password: string) => {
    if (!name || !email || !role || !password) throw new Error('name, email, role and password are required');
    const existing = await employeeModel.getUserByEmail(email);
    if (existing) throw new Error('Email already registered');
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const created = await employeeModel.createEmployee({ name, email, role, password: hashedPassword });
    // don't return password
    return { id: created.id, name: created.name, email: created.email, role: created.role };
};

export const loginUser = async (email: string, password: string) => {
    if (!email || !password) throw new Error('email and password are required');
    const user = await employeeModel.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, (user as any).password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });
    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};