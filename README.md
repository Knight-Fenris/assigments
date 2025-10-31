## Deployed at
https://testingribhav.pecfest.in
or
https://pathlockfrontend.vercel.app/

The backend is hosted on Azure
my-dotnet-api-demo.azurewebsites.net (F1 Machine)

# Assignment Project

Full-stack project demonstrating three assignments with C# .NET 8 backend and React TypeScript frontend.

## Project Structure

```
Ass/
├── backend/
│   └── UnifiedAPI/        # Single .NET 8 API for all 3 assignments
└── frontend/              # React + TypeScript UI
```

### Unified Backend Structure
All three assignments are now combined into a single backend API running on **port 5000**:
- **Assignment 1**: `/api/assignment1/*` - Basic Task Manager
- **Assignment 2**: `/api/assignment2/*` - Project Manager with Auth  
- **Assignment 3**: `/api/assignment3/*` - Smart Scheduler

## Assignments Overview

### Assignment 1 - Basic Task Manager (10 Credits)
A simple task management application with CRUD operations, filtering, and localStorage persistence.

**Tech Stack**: .NET 8 (in-memory storage) + React + TypeScript

**Features**:
- Display, add, update, and delete tasks
- Mark tasks as completed/uncompleted
- Filter tasks (All/Active/Completed)
- LocalStorage persistence

**API**: http://localhost:5001

---

### Assignment 2 - Mini Project Manager (20 Credits)
A comprehensive project management system with authentication and entity relationships.

**Tech Stack**: .NET 8 + Entity Framework Core + JWT + React + TypeScript

**Features**:
- User registration and JWT authentication
- Create and manage projects
- Add tasks with due dates to projects
- Toggle task completion
- User-specific data protection
- Full CRUD operations

**API**: http://localhost:5002

---

### Assignment 3 - Smart Scheduler API (10 Credits)
Intelligent task scheduling using topological sort for dependency management.

**Tech Stack**: .NET 8 standalone API

**Features**:
- Define task dependencies
- Automatic task ordering
- Estimated hours tracking
- Topological sort algorithm
- API endpoint: `POST /api/v1/schedule`
- Circular dependency detection

**API**: http://localhost:5003

---

## Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- npm or yarn

### Unified Backend Setup

```bash
cd backend\UnifiedAPI
dotnet restore
dotnet run
# API available at http://localhost:5000
# Swagger at http://localhost:5000/swagger
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# App available at http://localhost:5173
```

## Navigation

Once the frontend is running, you can access:

- **Home**: `http://localhost:5173/` - Overview of all assignments
- **Assignment 1**: `http://localhost:5173/assignment1` - Task Manager
- **Assignment 2**: `http://localhost:5173/assignment2` - Project Manager
- **Assignment 3**: `http://localhost:5173/assignment3` - Smart Scheduler

## Technology Stack

### Backend
- **C# .NET 8** - Framework
- **Entity Framework Core** - ORM (Assignment 2)
- **JWT** - Authentication (Assignment 2)
- **In-Memory Database** - Data storage
- **Swagger/OpenAPI** - API documentation
- **RESTful API** - Architecture

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## API Documentation

Full API documentation available at: `http://localhost:5000/swagger`

### Assignment 1 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/assignment1/tasks | Get all tasks |
| POST | /api/assignment1/tasks | Create a task |
| PUT | /api/assignment1/tasks/{id} | Update a task |
| DELETE | /api/assignment1/tasks/{id} | Delete a task |

### Assignment 2 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/assignment2/auth/register | Register user |
| POST | /api/assignment2/auth/login | Login user |
| GET | /api/assignment2/projects | Get all projects (Auth) |
| POST | /api/assignment2/projects | Create project (Auth) |
| GET | /api/assignment2/projects/{id} | Get project details (Auth) |
| DELETE | /api/assignment2/projects/{id} | Delete project (Auth) |
| POST | /api/assignment2/projects/{projectId}/tasks | Create task (Auth) |
| PUT | /api/assignment2/tasks/{taskId} | Update task (Auth) |
| DELETE | /api/assignment2/tasks/{taskId} | Delete task (Auth) |
| POST | /api/assignment2/projects/{projectId}/schedule | Get task order (Auth) |

### Assignment 3 API Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/assignment3/schedule | Schedule tasks with dependencies |

## Features Implemented

### Assignment 1 Enhancements ✅
- Task filtering (All/Completed/Active)
- LocalStorage persistence
- Clean, responsive design

### Assignment 2 Requirements ✅
- JWT authentication
- User registration and login
- Project CRUD operations
- Task management with due dates
- Protected routes
- Entity relationships (User → Projects → Tasks)
- Data validation

### Assignment 3 Requirements ✅
- Task dependency management
- Topological sort algorithm
- Smart scheduler endpoint
- Estimated hours tracking
- Recommended execution order

## Development Notes

- Both backends run simultaneously on different ports
- Frontend communicates with both backends based on the active page
- JWT tokens are stored in localStorage for Assignment 2
- In-memory databases reset when backends restart
- CORS is configured to allow frontend access

## Testing

### Testing Assignment 1
1. Start Assignment 1 backend
2. Start frontend
3. Navigate to Assignment 1 page
4. Add, complete, and delete tasks
5. Test filtering functionality

### Testing Assignment 2 & 3
1. Start Assignment 2 backend
2. Start frontend
3. Register a new user
4. Create projects
5. Add tasks with dependencies
6. Use Smart Scheduler to get recommended order

## Deployment Suggestions

- **Backend**: Azure App Service, Railway, or Render
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Database**: For production, replace in-memory DB with SQL Server, PostgreSQL, or SQLite
