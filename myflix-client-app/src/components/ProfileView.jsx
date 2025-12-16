import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard";

function ProfileView({ user, token, movies }) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        password: "",
        dateOfBirth: user?.dateOfBirth || ""
    });
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Filter favorite movies
        if (user?.FavoriteMovies && movies.length > 0) {
            const favorites = movies.filter(m => user.FavoriteMovies.includes(m._id));
            setFavoriteMovies(favorites);
        }
    }, [user, movies]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const updateData = {
            username: formData.username,
            email: formData.email,
            dateOfBirth: formData.dateOfBirth
        };

        if (formData.password) {
            updateData.password = formData.password;
        }

        axios.put(`https://myflix-api.onrender.com/users/${user.username}`, updateData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setMessage("Profile updated successfully!");
                setIsEditing(false);
                setFormData(prev => ({ ...prev, password: "" }));
            })
            .catch(err => {
                setError(err.response?.data?.message || "Failed to update profile");
            });
    };

    const handleDeregister = () => {
        if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            axios.delete(`https://myflix-api.onrender.com/users/${user.username}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    navigate("/signup");
                })
                .catch(err => {
                    setError(err.response?.data?.message || "Failed to deregister");
                });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <Container className="mt-5 mb-5">
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* User Info Card */}
            <Card className="mb-4">
                <Card.Header className="bg-primary text-white">
                    <Card.Title className="m-0">Profile Information</Card.Title>
                </Card.Header>
                <Card.Body>
                    {!isEditing ? (
                        <>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <p><strong>Username:</strong> {user?.username}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Email:</strong> {user?.email || "Not provided"}</p>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <p><strong>Date of Birth:</strong> {user?.dateOfBirth || "Not provided"}</p>
                                </Col>
                            </Row>
                            <div className="d-flex gap-2">
                                <Button variant="warning" onClick={() => setIsEditing(true)}>
                                    Edit Profile
                                </Button>
                                <Button variant="danger" onClick={handleDeregister}>
                                    Deregister Account
                                </Button>
                                <Button variant="secondary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Form onSubmit={handleUpdateUser}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>New Password (leave blank to keep current)</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                />
                            </Form.Group>

                            <div className="d-flex gap-2">
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                                <Button variant="secondary" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>

            {/* Favorite Movies Card */}
            <Card>
                <Card.Header className="bg-info text-white">
                    <Card.Title className="m-0">My Favorite Movies ({favoriteMovies.length})</Card.Title>
                </Card.Header>
                <Card.Body>
                    {favoriteMovies.length > 0 ? (
                        <Row>
                            {favoriteMovies.map((movie) => (
                                <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="mb-4">
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p className="text-muted">You haven't added any favorite movies yet.</p>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProfileView;
