import React from "react";
import MovieCard from "./MovieCard";
import { Row, Col, Container, Spinner } from "react-bootstrap";

function MainView({ user, token, movies = [], loading = false }) {
    return (
        <Container fluid className="py-4 px-4">
            <h2 className="mb-4">My Movies</h2>
            {loading ? (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status" className="mb-3" />
                    <p>Loading movies...</p>
                </div>
            ) : (
                <Row className="g-4">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={movie._id || movie.id}>
                                <MovieCard movie={movie} user={user} token={token} />
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                            <p className="text-muted">No movies available.</p>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
}

export default MainView;
