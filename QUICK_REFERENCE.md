# Quick Reference Guide

## 🚀 Start Everything (3 Commands)

```bash
# Terminal 1 - Assignment 1 Backend
cd backend\Assignment1 && dotnet run

# Terminal 2 - Assignment 2 Backend  
cd backend\Assignment2 && dotnet run

# Terminal 3 - Frontend
cd frontend && npm run dev
```

## 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main Application |
| Assignment 1 API | http://localhost:5001 | Task Manager API |
| Assignment 1 Swagger | http://localhost:5001/swagger | API Docs |
| Assignment 2 API | http://localhost:5002 | Project Manager API |
| Assignment 2 Swagger | http://localhost:5002/swagger | API Docs |

## 📋 Quick Test Checklist

### Assignment 1
- [ ] Add a task
- [ ] Toggle task completion
- [ ] Delete a task
- [ ] Filter tasks (All/Active/Completed)
- [ ] Refresh page (check localStorage persistence)

### Assignment 2
- [ ] Register a new user
- [ ] Login
- [ ] Create a project
- [ ] View project details
- [ ] Add tasks to project
- [ ] Toggle task completion
- [ ] Delete a task
- [ ] Delete a project
- [ ] Logout

### Assignment 3
- [ ] Add tasks with dependencies
- [ ] Set estimated hours
- [ ] Click "Smart Schedule"
- [ ] Verify topological order is correct

## 🔧 Common Commands

### Backend

```bash
# Restore packages
dotnet restore

# Build
dotnet build

# Run
dotnet run

# Clean
dotnet clean
```

### Frontend

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Port in Use
```bash
# Windows - Kill process on port
netstat -ano | findstr :5001
taskkill /PID <PID> /F
```

### Backend Issues
1. Delete bin/ and obj/ folders
2. Run `dotnet restore`
3. Run `dotnet build`
4. Run `dotnet run`

### Frontend Issues
1. Delete node_modules/
2. Run `npm install`
3. Run `npm run dev`

### CORS Errors
- Ensure both backends are running
- Check API URLs match backend ports
- Restart all services

## 📁 File Structure

```
Ass/
├── backend/
│   ├── Assignment1/     Port 5001
│   └── Assignment2/     Port 5002
├── frontend/            Port 3000
├── README.md
├── SETUP_GUIDE.md
└── ASSIGNMENT_SUMMARY.md
```

## 🔑 Key Features by Assignment

### Assignment 1 (10 credits)
- CRUD operations for tasks
- Task filtering
- LocalStorage persistence

### Assignment 2 (20 credits)
- JWT authentication
- Project management
- Task management
- Protected routes

### Assignment 3 (10 credits)
- Task dependencies
- Smart scheduling
- Topological sort

## 💡 Pro Tips

1. **Use Browser DevTools** (F12) for debugging
2. **Check Terminal Output** for error messages
3. **Refresh Swagger** after code changes
4. **Clear Browser Cache** if frontend acts weird
5. **Restart Backend** if database seems wrong (in-memory DB)

## 📝 Default Test Data

### Assignment 1
- No default data (in-memory, starts empty)
- Add tasks via UI

### Assignment 2
- No default users (register to create)
- Example user:
  - Email: test@example.com
  - Password: password123

### Assignment 3
- Create tasks with dependencies:
  - "Design API" (no dependencies)
  - "Implement Backend" (depends on Design API)
  - "Build Frontend" (depends on Design API)
  - "Test" (depends on Backend, Frontend)

## 🎯 API Endpoints Quick Reference

### Assignment 1
```
GET    /api/tasks        - List all tasks
POST   /api/tasks        - Create task
PUT    /api/tasks/{id}   - Update task
DELETE /api/tasks/{id}   - Delete task
```

### Assignment 2
```
# Auth
POST   /api/auth/register
POST   /api/auth/login

# Projects
GET    /api/projects
POST   /api/projects
GET    /api/projects/{id}
DELETE /api/projects/{id}

# Tasks
POST   /api/projects/{projectId}/tasks
PUT    /api/tasks/{taskId}
DELETE /api/tasks/{taskId}

# Smart Scheduler
POST   /api/v1/projects/{projectId}/schedule
```

## ⚡ Performance Notes

- In-memory databases are FAST but reset on restart
- Frontend uses Vite for instant hot reload
- Backend compiles on first run (may take 10-20 seconds)
- Subsequent runs are faster

## 🔒 Security Notes

- JWT tokens expire in 7 days
- Passwords are hashed with SHA256
- CORS is enabled for localhost only
- In production, use HTTPS and secure secrets

## 📊 Success Indicators

✅ Assignment 1 running = Swagger at :5001
✅ Assignment 2 running = Swagger at :5002
✅ Frontend running = App at :3000
✅ No console errors = Everything working
✅ Can complete all test checklist items = Full success!

---

**Need more details?** See SETUP_GUIDE.md

**Ready to code?** Open in VS Code and start all three terminals!
