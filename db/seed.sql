INSERT INTO Employees (name, email, role, password) VALUES 
('John Doe', 'john.doe@example.com', 'Developer', '$2b$10$EIXZ1Z1Z1Z1Z1Z1Z1Z1Z1Oe1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1'), 
('Jane Smith', 'jane.smith@example.com', 'Manager', '$2b$10$EIXZ1Z1Z1Z1Z1Z1Z1Z1Z1Oe1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1');

INSERT INTO Tasks (title, description, status, employee_id) VALUES 
('Task 1', 'Description for Task 1', 'Pending', 1), 
('Task 2', 'Description for Task 2', 'In Progress', 1), 
('Task 3', 'Description for Task 3', 'Completed', 2);