import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <Card style={{ width: "100%" }}>
            <Card.Img variant="top" src={movie?.image || "https://via.placeholder.com/300x450"} />
            <Card.Body>
                <Card.Title>{movie?.title || "Sample Movie"}</Card.Title>
                <Card.Text>
                    {movie?.description || "This is a short description of the movie."}
                </Card.Text>
                <Link to={`/movies/${movie?.id || "1"}`}>
                    <Button variant="primary">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
