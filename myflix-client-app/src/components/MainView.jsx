import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { Row, Col } from "react-bootstrap";

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
    }
  ]);

  return (
    <div className="container mt-4">
      <h2>My Movies</h2>
      <Row>
        {movies.map((movie) => (
          <Col md={4} key={movie.id} className="mb-4">
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MainView;
