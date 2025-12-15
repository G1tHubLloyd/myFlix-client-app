import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar.jsx";
import MainView from "./components/MainView.jsx";
import MovieView from "./components/MovieView.jsx";
import LoginView from "./components/LoginView.jsx";
import SignupView from "./components/SignupView.jsx";
import ProfileView from "./components/ProfileView.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const handleLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            user ? <MainView /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            !user ? <LoginView onLoggedIn={handleLoggedIn} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <SignupView /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            user ? <MovieView /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            user ? <ProfileView /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
