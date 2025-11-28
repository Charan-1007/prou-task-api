import { Router } from 'express';
import { createEmployee, getEmployees } from '../controllers/employeesController';

const router = Router();

// Route to create a new employee
router.post('/', createEmployee);

// Route to get all employees
router.get('/', getEmployees);

export default router;