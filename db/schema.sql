CREATE TABLE IF NOT EXISTS Employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    role VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS Tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    description TEXT,
    status VARCHAR NOT NULL CHECK (status IN ('Pending', 'In Progress', 'Completed')),
    employee_id INTEGER,
    FOREIGN KEY (employee_id) REFERENCES Employees(id) ON DELETE SET NULL
);