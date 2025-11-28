# ProU Task Management API

## Overview

This project is a Task Management API designed for managing employees and tasks within an internal company dashboard. It provides a RESTful interface for frontend developers to interact with employee and task data.

## Tech Stack

- Node.js
- Express
- SQLite3
- TypeScript
- JWT for authentication
- Bcrypt for password hashing

## Setup and Run Instructions

1. Clone the repository:

   ```
   git clone <https://github.com/Charan-1007/prou-task-api.git>
   cd prou-task-api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file and configure your environment variables.

4. Run the application:

   ```
   npm run dev
   ```

5. The server will start on the specified port (default is 3000).

## API Endpoints

Here is a clear summary of all the endpoints you can test, along with the correct method, URL, and JSON body to use in Postman.

### **1. Authentication (User Management)**

- **Register a New Employee** (This acts as your "Sign Up")

  - **Method:** `POST`
  - **URL:** `http://localhost:3000/auth/register`
  - **JSON Body:**
    ```json
    {
      "name": "Charan",
      "email": "charan@example.com",
      "password": "securepassword",
      "role": "Manager"
    }
    ```

- **Login** (This gets you the Token)

  - **Method:** `POST`
  - **URL:** `http://localhost:3000/auth/login`
  - **JSON Body:**
    ```json
    {
      "email": "charan@example.com",
      "password": "securepassword"
    }
    ```
  - **Note:** Copy the `token` from the response. You need it for the tasks below.

### **2. Tasks (Protected Operations)**

_For all these requests, you must go to the **Headers** tab in Postman and add:_

- **Key:** `Authorization`

- **Value:** `Bearer <PASTE_YOUR_TOKEN_HERE>`

- **Create a Task**

  - **Method:** `POST`
  - **URL:** `http://localhost:3000/tasks`
  - **JSON Body:**
    ```json
    {
      "title": "Review Code",
      "description": "Check the new PRs from the dev team",
      "status": "Pending"
    }
    ```

- **Update a Task**

  - **Method:** `PUT`
  - **URL:** `http://localhost:3000/tasks/1` (Replace `1` with the actual Task ID)
  - **JSON Body:**
    ```json
    {
      "status": "Completed"
    }
    ```

### **3. Public Operations (No Token Needed)**

- **Get All Tasks**

  - **Method:** `GET`
  - **URL:** `http://localhost:3000/tasks`

- **Filter Tasks by Status**

  - **Method:** `GET`
  - **URL:** `http://localhost:3000/tasks?status=Pending`

- **Filter Tasks by Employee ID**

  - **Method:** `GET`
  - **URL:** `http://localhost:3000/tasks?employeeId=1`

> Note: the implementation expects the query parameter `employee_id` (with underscore). If you use `employeeId` in Postman, it will not filter — use `employee_id=1`.

## Assumptions Made

- The API assumes that all email addresses are unique.
- The application does not implement advanced error handling for simplicity.
- The JWT token is required for creating and updating tasks, while viewing tasks is public.

