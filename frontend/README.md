# Assignment Project - Frontend

React + TypeScript frontend for all three assignments.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation

```bash
cd frontend
npm install
```

## Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/         # Reusable components
│   └── Navbar.tsx     # Navigation bar
├── context/           # React context providers
│   └── AuthContext.tsx # Authentication context
├── pages/             # Page components
│   ├── Home.tsx       # Landing page
│   ├── Assignment1.tsx # Task Manager
│   ├── Assignment2.tsx # Project Manager landing
│   └── Assignment2/   # Project Manager pages
│       ├── Login.tsx
│       ├── Register.tsx
│       ├── Dashboard.tsx
│       └── ProjectDetail.tsx
├── App.tsx            # Main app component
└── main.tsx          # Entry point
```

## Features by Assignment

### Assignment 1 - Basic Task Manager
- Task CRUD operations
- Task filtering (All/Active/Completed)
- LocalStorage persistence
- Connected to Assignment 1 backend (port 5001)

### Assignment 2 & 3 - Mini Project Manager
- User authentication (Login/Register)
- Project management
- Task management with dependencies
- Smart task scheduling
- Protected routes
- Connected to Assignment 2 backend (port 5002)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint the code

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling (no framework dependencies)

## API Configuration

The frontend connects to two backend APIs:

- Assignment 1 API: `http://localhost:5001`
- Assignment 2 API: `http://localhost:5002`

Make sure both backend servers are running before using the respective features.

## Authentication

Assignment 2 uses JWT token authentication. The token is:
- Stored in localStorage
- Automatically attached to API requests
- Validated on protected routes
- Cleared on logout

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment Suggestions

- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Render, Railway, or Azure App Service

Remember to update API URLs in production builds!
