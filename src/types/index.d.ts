interface Employee {
    id: number;
    name: string;
    email: string;
    role: string;
    password?: string; // Optional for internal use
}

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    employeeId: number; // Foreign key linking to Employee
}

interface CreateEmployeeRequest {
    name: string;
    email: string;
    role: string;
    password: string;
}

interface CreateTaskRequest {
    title: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    employeeId: number;
}

interface UpdateTaskRequest {
    title?: string;
    description?: string;
    status?: 'Pending' | 'In Progress' | 'Completed';
}

interface AuthResponse {
    token: string;
    employee: Employee;
}