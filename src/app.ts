import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import employeeRoutes from './routes/employees';
import taskRoutes from './routes/tasks';
import authRoutes from './routes/auth';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);

export default app;