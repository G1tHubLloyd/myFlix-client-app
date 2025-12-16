import React from "react";
import MovieCard from "./MovieCard";
import { Row, Col, Container } from "react-bootstrap";

function MainView({ user, token, movies = [] }) {
    return (
        <Container fluid className="py-4 px-4">
            <h2 className="mb-4">My Movies</h2>
            <Row className="g-4">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Col xs={12} sm={6} md={4} lg={3} key={movie._id || movie.id}>
                            <MovieCard movie={movie} user={user} token={token} />
                        </Col>
                    ))
                ) : (
                    <Col xs={12}>
                        <p className="text-muted">Loading movies...</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default MainView;
