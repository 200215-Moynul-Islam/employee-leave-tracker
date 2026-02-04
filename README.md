# Employee Leave Tracker

## Project Overview

Employee Leave Tracker is a full-stack web application for managing employee leave requests. The system supports two roles: **Admin** and **Employee**, with secure authentication and role-based authorization using JWT.

>**User Management Policy:** Only Admin can create employee accounts. Employees must log in using the credentials provided by an Admin. Employees cannot self-register.

---

## Features

### Admin

* Login using email and password
* Add, edit, and remove employees
* View all pending leave requests and approve or reject them
* View complete leave request history of all employees

### Employee

* Login and logout
* Change own password (cannot update other profile information)
* Submit new leave requests
* View leave request history
* Delete a leave request only if its status is **Pending**

### Common

* JWT-based authentication and authorization
* Role-based redirection after login

---

## Technology Stack

* **Backend:** ASP.NET 9, Entity Framework Core, JWT
* **Frontend:** React, Vite
* **Database:** SQL Server
* **Containerization:** Docker, Docker Compose

---

## How to Run the Project

### Using Docker

1. Clone the repository:

```bash
git clone https://github.com/200215-Moynul-Islam/employee-leave-tracker.git
cd employee-leave-tracker
```

2. Start all services:

```bash
docker-compose up --build
```

3. Access the application:

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8082](http://localhost:8082)

---

### Manual Setup (Without Docker)

1. Clone the repository:

```bash
git clone https://github.com/200215-Moynul-Islam/employee-leave-tracker.git
cd employee-leave-tracker
```

2. Run the backend:

```bash
cd backend

# Set database connection string (update according to your local SQL Server setup)
export DB_CONNECTION="Server=<YOUR_DB_SERVER>;Database=EmployeeLeaveTracker;Trusted_Connection=True;TrustServerCertificate=True;"

# Restore tools and dependencies, apply migrations, and start API
dotnet tool restore        # restores dotnet-ef
dotnet restore             # restores NuGet packages
dotnet ef database update  # applies EF Core migrations
dotnet run                 # backend runs on http://localhost:5219
```

3. Run the frontend:

```bash
cd ../frontend

# Point frontend to backend API
export VITE_API_BASE_URL=http://localhost:5219/api

# Install dependencies and start dev server
npm install
npm run dev                # frontend runs on http://localhost:3000
```

####

---

## Default Admin Credentials

* **Email:** [admin@gmail.com](mailto:admin@gmail.com)
* **Password:** @aA12345

> This credential is for development/testing only.

---