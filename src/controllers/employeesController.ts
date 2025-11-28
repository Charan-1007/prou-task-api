import { Request, Response } from 'express';
import * as employeeModel from '../models/employeeModel';

// Get all employees
export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeModel.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving employees', error });
    }
};

// Create a new employee (admin or registration endpoint)
export const createEmployee = async (req: Request, res: Response) => {
    const { name, email, role, password } = req.body;
    if (!name || !email || !role) {
        return res.status(400).json({ message: 'name, email and role are required' });
    }
    try {
        const newEmployee = await employeeModel.createEmployee({ name, email, role, password });
        res.status(201).json(newEmployee);
    } catch (error: any) {
        res.status(400).json({ message: 'Error creating employee', error: error.message || error });
    }
};