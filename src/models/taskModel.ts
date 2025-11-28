import { db } from '../config/database';

export interface Task {
    id?: number;
    title: string;
    description?: string;
    status: string;
    employee_id?: number | null;
}

function getDb() {
    if (!db) throw new Error('Database not initialized');
    return db;
}

export const createTask = async (task: Task): Promise<Task> => {
    const database = getDb();
    const result = await database.run(
        'INSERT INTO Tasks (title, description, status, employee_id) VALUES (?, ?, ?, ?)',
        task.title, task.description || null, task.status, task.employee_id || null
    );
    return { id: result.lastID as number, ...task };
};

export const getTasks = async (status?: string, employeeId?: number): Promise<Task[]> => {
    const database = getDb();
    let sql = 'SELECT * FROM Tasks';
    const params: any[] = [];
    if (status) {
        sql += ' WHERE status = ?';
        params.push(status);
    }
    if (employeeId) {
        sql += params.length ? ' AND' : ' WHERE';
        sql += ' employee_id = ?';
        params.push(employeeId);
    }
    const rows = await database.all(sql, ...params);
    return rows as Task[];
};

export const updateTask = async (id: number, task: Partial<Task>): Promise<boolean> => {
    const database = getDb();
    const fields: string[] = [];
    const params: any[] = [];

    if (task.title !== undefined) {
        fields.push('title = ?');
        params.push(task.title);
    }
    if (task.description !== undefined) {
        fields.push('description = ?');
        params.push(task.description);
    }
    if (task.status !== undefined) {
        fields.push('status = ?');
        params.push(task.status);
    }
    if (task.employee_id !== undefined) {
        fields.push('employee_id = ?');
        params.push(task.employee_id);
    }

    if (fields.length === 0) {
        // Nothing to update
        return false;
    }

    const sql = `UPDATE Tasks SET ${fields.join(', ')} WHERE id = ?`;
    params.push(id);

    const result = await database.run(sql, ...params);
    return (result.changes || 0) > 0;
};

export const deleteTask = async (id: number): Promise<boolean> => {
    const database = getDb();
    const result = await database.run('DELETE FROM Tasks WHERE id = ?', id);
    return (result.changes || 0) > 0;
};