import { db } from '../config/database';

export interface Employee {
    id?: number;
    name: string;
    email: string;
    role: string;
    password?: string;
}

function getDb() {
    if (!db) throw new Error('Database not initialized');
    return db;
}

export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const database = getDb();
    const result = await database.run(
        'INSERT INTO Employees (name, email, role, password) VALUES (?, ?, ?, ?)',
        employee.name,
        employee.email,
        employee.role,
        employee.password || null
    );
    return { id: result.lastID as number, name: employee.name, email: employee.email, role: employee.role };
};

export const getAllEmployees = async (): Promise<Employee[]> => {
    const database = getDb();
    const rows = await database.all('SELECT id, name, email, role FROM Employees');
    return rows as Employee[];
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    const database = getDb();
    const row = await database.get('SELECT id, name, email, role FROM Employees WHERE id = ?', id);
    return row || null;
};

export const getUserByEmail = async (email: string): Promise<Employee | null> => {
    const database = getDb();
    const row = await database.get('SELECT id, name, email, role, password FROM Employees WHERE email = ?', email);
    return row || null;
};

export const updateEmployee = async (id: number, employee: Partial<Employee>): Promise<void> => {
    const database = getDb();
    await database.run('UPDATE Employees SET name = ?, email = ?, role = ? WHERE id = ?',
        employee.name, employee.email, employee.role, id);
};

export const deleteEmployee = async (id: number): Promise<void> => {
    const database = getDb();
    await database.run('DELETE FROM Employees WHERE id = ?', id);
};