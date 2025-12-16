import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "https://myflix-api.onrender.com";

function MovieCard({ movie, user, token }) {
    const handleFavorite = () => {
        if (!user || !token) {
            alert("Please log in to add favorites");
            return;
        }

        axios.post(`${API_URL}/users/${user.username}/movies/${movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => alert("✓ Added to favorites"))
            .catch(err => {
                console.error("Error:", err);
                alert("Failed to add favorite: " + (err.response?.data?.message || err.message));
            });
    };

    const handleRemoveFavorite = () => {
        if (!user || !token) {
            alert("Please log in to remove favorites");
            return;
        }

        axios.delete(`${API_URL}/users/${user.username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => alert("✓ Removed from favorites"))
            .catch(err => {
                console.error("Error:", err);
                alert("Failed to remove favorite: " + (err.response?.data?.message || err.message));
            });
    };

    const isFavorite = user?.FavoriteMovies?.includes(movie._id);

    return (
        <Card style={{ width: "100%" }} className="h-100">
            <Card.Img variant="top" src={movie.ImagePath || movie.image || "https://via.placeholder.com/300x450"} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.Title || movie.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                    {movie.Description || movie.description}
                </Card.Text>
                <div className="d-flex gap-2 flex-wrap">
                    <Link to={`/movies/${movie._id || movie.id}`} className="flex-grow-1">
                        <Button variant="primary" className="w-100">View Details</Button>
                    </Link>
                    {isFavorite ? (
                        <Button variant="danger" onClick={handleRemoveFavorite}>♥ Remove</Button>
                    ) : (
                        <Button variant="success" onClick={handleFavorite}>♡ Favorite</Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
