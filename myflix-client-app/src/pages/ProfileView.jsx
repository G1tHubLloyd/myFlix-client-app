import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Card } from "react-bootstrap";
import MovieCard from "../components/MovieCard.jsx";

function ProfileView({ movies }) {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    Username: "",
    Password: "",
    Email: "",
    Birthday: ""
  });

  // Fetch user info from /users endpoint
  useEffect(() => {
    axios.get("/users")
      .then(response => {
        // Example: filter by logged-in username
        const loggedInUser = response.data.find(u => u.Username === "demoUser");
        setUser(loggedInUser);
        setUpdatedUser(loggedInUser);
      })
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  // Filter favorite movies
  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));

  // Update user info
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`/users/${user.Username}`, updatedUser)
      .then(() => alert("User updated successfully"))
      .catch(err => console.error(err));
  };

  // Deregister user
  const handleDelete = () => {
    axios.delete(`/users/${user.Username}`)
      .then(() => alert("User deregistered"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{user.Username}</Card.Title>
          <Card.Text>Email: {user.Email}</Card.Text>
          <Card.Text>Birthday: {user.Birthday}</Card.Text>
        </Card.Body>
      </Card>

      <Form onSubmit={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={updatedUser.Username}
            onChange={(e) => setUpdatedUser({ ...updatedUser, Username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={updatedUser.Password}
            onChange={(e) => setUpdatedUser({ ...updatedUser, Password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={updatedUser.Email}
            onChange={(e) => setUpdatedUser({ ...updatedUser, Email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={updatedUser.Birthday}
            onChange={(e) => setUpdatedUser({ ...updatedUser, Birthday: e.target.value })}
          />
        </Form.Group>
        <Button type="submit" variant="primary">Update Profile</Button>
        <Button variant="danger" className="ms-2" onClick={handleDelete}>Deregister</Button>
      </Form>

      <h3 className="mt-4">Favorite Movies</h3>
      <div className="d-flex flex-wrap">
        {favoriteMovies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default ProfileView;
