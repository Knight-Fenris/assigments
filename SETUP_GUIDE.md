# Setup and Run Guide

This guide will help you set up and run all three assignments.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **.NET 8 SDK** - Download from https://dotnet.microsoft.com/download/dotnet/8.0
2. **Node.js 18+** - Download from https://nodejs.org/
3. **npm** (comes with Node.js) or **yarn**
4. **Git** (optional, for cloning)
5. **A code editor** (VS Code recommended)

## Verify Installation

Open a terminal/command prompt and run:

```bash
# Check .NET version
dotnet --version
# Should show 8.x.x

# Check Node.js version
node --version
# Should show v18.x.x or higher

# Check npm version
npm --version
# Should show 9.x.x or higher
```

## Step-by-Step Setup

### Step 1: Navigate to the Project Directory

```bash
cd c:\Users\Ribhav\Desktop\Code\pecfest25\Ass
```

### Step 2: Set Up Backend - Assignment 1

Open a new terminal window:

```bash
# Navigate to Assignment 1 backend
cd backend\Assignment1

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the project
dotnet run
```

You should see output like:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5001
```

**Keep this terminal open!** The Assignment 1 API is now running.

Test it by opening: http://localhost:5001/swagger in your browser.

### Step 3: Set Up Backend - Assignment 2 (includes Assignment 3)

Open another new terminal window:

```bash
# Navigate to Assignment 2 backend
cd backend\Assignment2

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the project
dotnet run
```

You should see output like:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5002
```

**Keep this terminal open!** The Assignment 2 API is now running.

Test it by opening: http://localhost:5002/swagger in your browser.

### Step 4: Set Up Frontend

Open another new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (this may take a few minutes)
npm install

# Start the development server
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Keep this terminal open!** The frontend is now running.

Open http://localhost:3000 in your browser.

## What You Should See

### At http://localhost:3000
- A beautiful home page with three assignment cards
- Navigation bar with Home, Assignment 1, Assignment 2, Assignment 3 links

### At http://localhost:5001/swagger
- Swagger UI for Assignment 1 API
- Endpoints: GET, POST, PUT, DELETE /api/tasks

### At http://localhost:5002/swagger
- Swagger UI for Assignment 2 API
- Authentication endpoints
- Project and Task endpoints
- Smart Scheduler endpoint

## Testing the Applications

### Testing Assignment 1 (Basic Task Manager)

1. Click "Assignment 1" in the navbar
2. Add a task by typing in the input field and clicking "Add Task"
3. Check/uncheck the checkbox to toggle completion
4. Use the filter buttons (All/Active/Completed) to filter tasks
5. Click "Delete" to remove a task
6. Refresh the page - tasks should persist (localStorage)

### Testing Assignment 2 & 3 (Project Manager with Smart Scheduler)

1. Click "Assignment 2" in the navbar
2. Click "Register" to create a new account
   - Fill in username, email, and password
   - Click "Register"
3. You'll be automatically logged in and redirected to the Dashboard
4. Click "+ New Project" to create a project
   - Enter a title (3-100 characters)
   - Optionally add a description
   - Click "Create"
5. Click "View Details" on a project
6. Click "+ Add Task" to add tasks
   - Enter task title
   - Optionally set due date
   - Set estimated hours
   - Add dependencies (comma-separated task titles from other tasks)
   - Click "Add Task"
7. Click "🤖 Smart Schedule" to see the recommended task order based on dependencies
8. Check/uncheck tasks to mark them as completed
9. Click "Delete" to remove tasks

## Troubleshooting

### Port Already in Use

If you see an error like "Address already in use":

**For Windows:**
```bash
# Find process using port 5001
netstat -ano | findstr :5001

# Kill the process (replace PID with the actual process ID)
taskkill /PID <PID> /F
```

Repeat for ports 5002 and 3000 if needed.

### Backend Won't Start

1. Ensure .NET 8 SDK is installed: `dotnet --version`
2. Delete `bin` and `obj` folders in the backend project
3. Run `dotnet restore` again
4. Check for any error messages in the terminal

### Frontend Won't Start

1. Delete the `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Try `npm run dev`

### CORS Errors

If you see CORS errors in the browser console:
1. Make sure both backends are running
2. Check that the API URLs in the frontend code match the backend ports
3. Restart all three services

### Database Reset

The backends use in-memory databases. If you restart a backend, all data will be lost. This is normal for development.

## Stopping the Servers

To stop any of the servers:
- Press `Ctrl + C` in the terminal where it's running
- Type `Y` when asked to terminate

## Development Tips

### Running in VS Code

1. Open the project folder in VS Code
2. Open 3 terminal windows (Terminal → New Terminal)
3. Run each backend and frontend in separate terminals
4. Use VS Code's split terminal feature for better visibility

### Hot Reload

- **Frontend**: Changes to .tsx, .ts, .css files will automatically reload
- **Backend**: Changes require stopping (Ctrl+C) and restarting (`dotnet run`)

### Debugging

- Use browser DevTools (F12) for frontend debugging
- Use `console.log()` in frontend
- Use breakpoints in VS Code for .NET debugging

## Production Build

### Frontend Production Build

```bash
cd frontend
npm run build
# Output will be in the 'dist' folder
```

### Backend Production

For production, you would:
1. Replace in-memory database with SQL Server, PostgreSQL, or SQLite
2. Use proper secrets management (Azure Key Vault, AWS Secrets Manager)
3. Configure HTTPS
4. Set up proper CORS origins
5. Use environment variables for configuration

## Additional Resources

- **.NET 8 Documentation**: https://learn.microsoft.com/en-us/dotnet/
- **React Documentation**: https://react.dev/
- **TypeScript Documentation**: https://www.typescriptlang.org/docs/
- **Vite Documentation**: https://vitejs.dev/
- **Entity Framework Core**: https://learn.microsoft.com/en-us/ef/core/

## Need Help?

If you encounter issues:
1. Check the console/terminal for error messages
2. Verify all prerequisites are installed
3. Ensure you're in the correct directory
4. Check that all three servers are running on the correct ports
5. Clear browser cache and try again

## Summary

You should now have:
- ✅ Assignment 1 API running on http://localhost:5001
- ✅ Assignment 2 API running on http://localhost:5002
- ✅ Frontend application running on http://localhost:3000
- ✅ All features working and accessible

Happy coding! 🚀
