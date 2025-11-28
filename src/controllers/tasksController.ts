import { Request, Response } from 'express';
import * as taskModel from '../models/taskModel';

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    const { title, description, status, employee_id } = req.body;
    if (!title || !status) {
        return res.status(400).json({ message: 'title and status are required' });
    }

    try {
        const newTask = await taskModel.createTask({ title, description, status, employee_id });
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating task', error: error.message || error });
    }
};

// Get all tasks with optional filtering
export const getTasks = async (req: Request, res: Response) => {
    const { status, employee_id } = req.query;
    try {
        const empId = employee_id ? Number(employee_id) : undefined;
        const tasks = await taskModel.getTasks(status as string | undefined, empId);
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving tasks', error: error.message || error });
    }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status, employee_id } = req.body;
    try {
        const updated = await taskModel.updateTask(Number(id), { title, description, status, employee_id });
        if (updated) {
            const tasks = await taskModel.getTasks();
            const updatedTask = tasks.find(t => t.id === Number(id));
            res.status(200).json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating task', error: error.message || error });
    }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await taskModel.deleteTask(Number(id));
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting task', error: error.message || error });
    }
};