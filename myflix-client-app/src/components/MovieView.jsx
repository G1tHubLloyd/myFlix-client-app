import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

function MovieView({ user, token, movies = [] }) {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    // Find movie from passed props or use mock data
    let movie = movies.find(m => m._id === movieId) || {};

    const handleFavorite = () => {
        axios.post(`https://myflix-api.onrender.com/users/${user.username}/movies/${movieId}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setMessage("✓ Added to favorites!");
                setTimeout(() => setMessage(""), 2000);
            })
            .catch(err => {
                setMessage("Failed to add to favorites");
                console.error(err);
            });
    };

    const handleRemoveFavorite = () => {
        axios.delete(`https://myflix-api.onrender.com/users/${user.username}/movies/${movieId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                setMessage("✓ Removed from favorites!");
                setTimeout(() => setMessage(""), 2000);
            })
            .catch(err => {
                setMessage("Failed to remove from favorites");
                console.error(err);
            });
    };

    const isFavorite = user?.FavoriteMovies?.includes(movieId);

    return (
        <Container fluid className="py-4 px-4">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
                &larr; Back
            </Button>
            {message && <div className="alert alert-info">{message}</div>}
            <Card>
                <Row className="g-0">
                    <Col md={4}>
                        <Card.Img src={movie.ImagePath || movie.image || "https://via.placeholder.com/300x450"} alt={movie.Title || movie.title} />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title as="h2">{movie.Title || movie.title}</Card.Title>
                            <Card.Text>
                                <strong>Description:</strong> {movie.Description || movie.description}
                            </Card.Text>
                            <Card.Text>
                                <strong>Director:</strong> {movie.Director || movie.director}
                            </Card.Text>
                            <Card.Text>
                                <strong>Genre:</strong> {movie.Genre || movie.genre}
                            </Card.Text>
                            <Card.Text>
                                <strong>Year:</strong> {movie.Year || movie.year}
                            </Card.Text>
                            <div className="d-flex gap-2 mt-3">
                                {isFavorite ? (
                                    <Button variant="danger" onClick={handleRemoveFavorite}>
                                        ♥ Remove from Favorites
                                    </Button>
                                ) : (
                                    <Button variant="success" onClick={handleFavorite}>
                                        ♡ Add to Favorites
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default MovieView;
