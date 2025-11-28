import { Router } from 'express';
import {
    createTask,
    updateTask,
    getTasks,
    deleteTask
} from '../controllers/tasksController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// GET /tasks - Retrieve tasks with optional filtering
router.get('/', getTasks);

// POST /tasks - Create a new task (protected route)
router.post('/', authenticate, createTask);

// PUT /tasks/:id - Update a task by ID (protected route)
router.put('/:id', authenticate, updateTask);

// DELETE /tasks/:id - Delete a task by ID (protected route)
router.delete('/:id', authenticate, deleteTask);

export default router;