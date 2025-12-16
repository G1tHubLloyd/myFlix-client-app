import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "./components/NavigationBar.jsx";
import MainView from "./components/MainView.jsx";
import MovieView from "./components/MovieView.jsx";
import LoginView from "./components/LoginView.jsx";
import SignupView from "./components/SignupView.jsx";
import ProfileView from "./components/ProfileView.jsx";

const API_URL = "https://myflix-api.onrender.com";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Restore login state from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Fetch movies from API
  useEffect(() => {
    axios.get(`${API_URL}/movies`)
      .then(response => setMovies(response.data))
      .catch(err => console.error("Failed to fetch movies:", err));
  }, []);

  // Fetch user data and update state when token changes
  useEffect(() => {
    if (token && user) {
      axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          const foundUser = response.data.find(u => u.username === user.username);
          if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("user", JSON.stringify(foundUser));
          }
        })
        .catch(err => console.error("Failed to fetch user data:", err));
    }
  }, [token]);

  const handleLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
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
      <div className="container-fluid">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <MainView
                  user={user}
                  token={token}
                  movies={movies}
                  setMovies={setMovies}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              !user ? (
                <LoginView onLoggedIn={handleLoggedIn} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/signup"
            element={!user ? <SignupView /> : <Navigate to="/" replace />}
          />
          <Route
            path="/movies/:movieId"
            element={
              user ? (
                <MovieView user={user} token={token} movies={movies} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView user={user} token={token} movies={movies} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
