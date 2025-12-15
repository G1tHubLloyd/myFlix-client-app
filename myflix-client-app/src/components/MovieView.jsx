import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col } from "react-bootstrap";

function MovieView() {
    const { movieId } = useParams();
    const navigate = useNavigate();

    // Mock movie data (replace with API call later)
    const movies = {
        "1": {
            title: "The Shawshank Redemption",
            description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            image: "https://via.placeholder.com/300x450?text=Shawshank",
            director: "Frank Darabont",
            genre: "Drama",
            year: 1994
        },
        "2": {
            title: "The Godfather",
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            image: "https://via.placeholder.com/300x450?text=Godfather",
            director: "Francis Ford Coppola",
            genre: "Crime",
            year: 1972
        },
        "3": {
            title: "The Dark Knight",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest tests.",
            image: "https://via.placeholder.com/300x450?text=Dark+Knight",
            director: "Christopher Nolan",
            genre: "Action",
            year: 2008
        }
    };

    const movie = movies[movieId] || {};

    return (
        <Container fluid className="py-4 px-4">
            <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
                &larr; Back
            </Button>
            <Card>
                <Row className="g-0">
                    <Col md={4}>
                        <Card.Img src={movie.image} alt={movie.title} />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title as="h2">{movie.title}</Card.Title>
                            <Card.Text>
                                <strong>Description:</strong> {movie.description}
                            </Card.Text>
                            <Card.Text>
                                <strong>Director:</strong> {movie.director}
                            </Card.Text>
                            <Card.Text>
                                <strong>Genre:</strong> {movie.genre}
                            </Card.Text>
                            <Card.Text>
                                <strong>Year:</strong> {movie.year}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default MovieView;
