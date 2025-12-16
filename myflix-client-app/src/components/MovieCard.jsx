import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function MovieCard({ movie }) {
    const handleFavorite = () => {
        axios.post(`/users/demoUser/movies/${movie._id}`)
            .then(() => alert("Added to favorites"))
            .catch(err => console.error(err));
    };

    const handleRemoveFavorite = () => {
        axios.delete(`/users/demoUser/movies/${movie._id}`)
            .then(() => alert("Removed from favorites"))
            .catch(err => console.error(err));
    };

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
                    <Button variant="success" onClick={handleFavorite}>♥ Favorite</Button>
                    <Button variant="secondary" onClick={handleRemoveFavorite}>Remove</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
