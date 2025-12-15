import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { Row, Col, Container } from "react-bootstrap";

function MainView() {
    const [movies] = useState([
        {
            id: "1",
            title: "The Shawshank Redemption",
            description: "Two imprisoned men bond over a number of years.",
            image: "https://via.placeholder.com/300x450?text=Shawshank",
            director: "Frank Darabont",
            genre: "Drama"
        },
        {
            id: "2",
            title: "The Godfather",
            description: "The aging patriarch of an organized crime dynasty.",
            image: "https://via.placeholder.com/300x450?text=Godfather",
            director: "Francis Ford Coppola",
            genre: "Crime"
        },
        {
            id: "3",
            title: "The Dark Knight",
            description: "Batman faces the Joker in Gotham City.",
            image: "https://via.placeholder.com/300x450?text=Dark+Knight",
            director: "Christopher Nolan",
            genre: "Action"
        },
        {
            id: "4",
            title: "Pulp Fiction",
            description: "The lives of two mob hitmen, a boxer, and more intertwine.",
            image: "https://via.placeholder.com/300x450?text=Pulp+Fiction",
            director: "Quentin Tarantino",
            genre: "Crime"
        },
        {
            id: "5",
            title: "Forrest Gump",
            description: "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
            image: "https://via.placeholder.com/300x450?text=Forrest+Gump",
            director: "Robert Zemeckis",
            genre: "Drama"
        },
        {
            id: "6",
            title: "Inception",
            description: "A thief who steals corporate secrets through dream-sharing technology.",
            image: "https://via.placeholder.com/300x450?text=Inception",
            director: "Christopher Nolan",
            genre: "Sci-Fi"
        },
        {
            id: "7",
            title: "The Matrix",
            description: "A computer hacker learns about the true nature of reality.",
            image: "https://via.placeholder.com/300x450?text=Matrix",
            director: "The Wachowskis",
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
