import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { Row, Col, Container } from "react-bootstrap";

function MainView({ user, token, movies = [] }) {
    return (
        <Container fluid className="py-4 px-4">
            <h2 className="mb-4">My Movies</h2>
            <Row className="g-4">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
                            <MovieCard movie={movie} user={user} token={token} />
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <p>Loading movies...</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
            genre: "Sci-Fi"
        },
        {
            id: "8",
            title: "Goodfellas",
            description: "The story of Henry Hill and his life in the mob.",
            image: "https://via.placeholder.com/300x450?text=Goodfellas",
            director: "Martin Scorsese",
            genre: "Crime"
        },
        {
            id: "9",
            title: "The Silence of the Lambs",
            description: "A young FBI cadet seeks the advice of an imprisoned cannibal.",
            image: "https://via.placeholder.com/300x450?text=Silence",
            director: "Jonathan Demme",
            genre: "Thriller"
        }
    ]);

    return (
        <Container fluid className="py-4 px-4">
            <h2 className="mb-4">My Movies</h2>
            <Row className="g-4">
                {movies.map((movie) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <MovieCard movie={movie} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MainView;
