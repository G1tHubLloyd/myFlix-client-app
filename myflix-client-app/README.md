# myFlix Client App

A React-based movie application built with Vite, featuring client-side routing and authentication.

## Features Implemented

### ✅ React Router Integration (feature/routing branch)

**Routing Setup:**
- Installed `react-router` and `react-router-dom` packages
- Configured `BrowserRouter` in App.jsx with protected routes
- Implemented client-side navigation using React Router Links

**Views Created:**
- **MainView** - Displays a grid of movies (requires authentication)
- **MovieView** - Shows detailed information about a selected movie with back navigation
- **LoginView** - User login form
- **SignupView** - User registration form
- **ProfileView** - User profile with logout functionality

**Navigation Features:**
- **NavigationBar** with conditional rendering:
  - Unauthenticated users: Login/Signup links
  - Authenticated users: Home/Profile/Logout links
- Hamburger menu for mobile responsiveness
- React Router `Link` components replace traditional button onClick handlers
- `useParams()` hook to get movieId from URL
- `useNavigate()` hook for programmatic navigation

**Routes:**
- `/` - Home (MainView) - Protected
- `/login` - Login page
- `/signup` - Signup page
- `/movies/:movieId` - Movie details - Protected
- `/profile` - User profile - Protected

## Tech Stack

- **React** 19.2.0
- **Vite** 7.2.4
- **React Router** 6.x
- **React Bootstrap** 2.10.10
- **Bootstrap** 5.3.8

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Server runs at http://localhost:5173/

## Build

```bash
npm build
```

## Git Branches

- `main` - Initial setup
- `feature/routing` - React Router implementation with authentication flow

---

## React + Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
