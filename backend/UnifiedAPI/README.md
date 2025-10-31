# Unified Assignment API

Complete REST API combining all three assignments into a single backend service running on port 5000.

## Architecture

This unified API consolidates:
- **Assignment 1**: Basic Task Manager (In-Memory Storage)
- **Assignment 2**: Project Manager with JWT Authentication (Entity Framework)
- **Assignment 3**: Smart Scheduler with Topological Sort

## API Endpoints

### Assignment 1 - Basic Task Manager
**Base URL**: `/api/assignment1/tasks`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignment1/tasks` | Get all tasks |
| POST | `/api/assignment1/tasks` | Create a new task |
| PUT | `/api/assignment1/tasks/{id}` | Update a task |
| DELETE | `/api/assignment1/tasks/{id}` | Delete a task |

**Request Example**:
```json
POST /api/assignment1/tasks
{
  "description": "Complete assignment",
  "isCompleted": false
}
```

---

### Assignment 2 - Project Manager
**Base URL**: `/api/assignment2`

#### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assignment2/auth/register` | Register new user |
| POST | `/api/assignment2/auth/login` | Login user |

**Register Example**:
```json
POST /api/assignment2/auth/register
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGc...",
  "userId": 1,
  "username": "john",
  "email": "john@example.com"
}
```

#### Project Endpoints (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignment2/projects` | Get all user projects |
| POST | `/api/assignment2/projects` | Create a new project |
| GET | `/api/assignment2/projects/{id}` | Get project with tasks |
| DELETE | `/api/assignment2/projects/{id}` | Delete a project |

#### Task Endpoints (Auth Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assignment2/projects/{projectId}/tasks` | Create task in project |
| PUT | `/api/assignment2/tasks/{taskId}` | Update a task |
| DELETE | `/api/assignment2/tasks/{taskId}` | Delete a task |
| POST | `/api/assignment2/projects/{projectId}/schedule` | Get recommended task order |

---

### Assignment 3 - Smart Scheduler
**Base URL**: `/api/assignment3`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assignment3/schedule` | Get optimal task execution order |

**Request Example**:
```json
POST /api/assignment3/schedule
{
  "tasks": [
    {
      "title": "Setup Database",
      "estimatedHours": 2,
      "dependencies": []
    },
    {
      "title": "Create API",
      "estimatedHours": 4,
      "dependencies": ["Setup Database"]
    },
    {
      "title": "Build Frontend",
      "estimatedHours": 6,
      "dependencies": ["Create API"]
    }
  ]
}
```

**Response**:
```json
{
  "recommendedOrder": [
    "Setup Database",
    "Create API",
    "Build Frontend"
  ]
}
```

---

## Running the API

### Prerequisites
- .NET 8 SDK

### Start the Server
```bash
cd backend\UnifiedAPI
dotnet restore
dotnet run
```

The API will be available at:
- **HTTP**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger

---

## Features

### Assignment 1 (10 Credits)
- ✅ In-memory task storage
- ✅ CRUD operations for tasks
- ✅ Task completion status

### Assignment 2 (20 Credits)
- ✅ User registration and authentication
- ✅ JWT token-based authorization
- ✅ Project management
- ✅ Task management with projects
- ✅ Entity Framework Core with In-Memory database
- ✅ Password hashing (SHA256)

### Assignment 3 (10 Credits)
- ✅ Task dependency management
- ✅ Topological sort algorithm (Kahn's algorithm)
- ✅ Circular dependency detection
- ✅ Optimal task scheduling

---

## Authentication

For Assignment 2 endpoints (except `/auth/register` and `/auth/login`), include the JWT token in the Authorization header:

```
Authorization: Bearer your-jwt-token-here
```

---

## Tech Stack

- **Framework**: .NET 8
- **ORM**: Entity Framework Core 8.0
- **Database**: In-Memory Database
- **Authentication**: JWT Bearer Tokens
- **Password Hashing**: SHA256
- **API Documentation**: Swagger/OpenAPI

---

## Development

### Project Structure
```
UnifiedAPI/
├── Controllers/
│   ├── Assignment1Controller.cs    # Task Manager endpoints
│   ├── AuthController.cs            # Authentication
│   ├── ProjectsController.cs        # Project management
│   ├── TasksController.cs           # Project tasks
│   └── SchedulerController.cs       # Smart Scheduler
├── Services/
│   ├── TaskStorageService.cs        # In-memory task storage
│   ├── AuthService.cs               # Authentication logic
│   ├── ProjectService.cs            # Project business logic
│   ├── TaskService.cs               # Task business logic
│   └── SchedulerService.cs          # Topological sort algorithm
├── Models/
│   ├── TaskItem.cs                  # Simple task model
│   ├── User.cs                      # User entity
│   ├── Project.cs                   # Project entity
│   ├── ProjectTask.cs               # Project task entity
│   └── TaskScheduleModels.cs        # Scheduler models
├── DTOs/
│   ├── AuthDtos.cs                  # Auth request/response
│   ├── ProjectDtos.cs               # Project DTOs
│   └── TaskDtos.cs                  # Task DTOs
├── Data/
│   └── ApplicationDbContext.cs      # EF Core context
└── Program.cs                       # App configuration
```

---

## CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (Vite dev server default)
- `http://localhost:5173` (Alternative Vite port)

---

