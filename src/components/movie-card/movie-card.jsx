import React from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    const year = new Date(movie.Year);
    const movieyear = (year.getFullYear());
    return (
      <Card key={movie._id} variant="light" onClick={() => { onMovieClick(movie); }} >
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title>
            <h5 className="movie-card_title">{movie.Name} <span className="movie-card_year"> {movieyear}</span></h5>
          </Card.Title>
        </Card.Body>
      </ Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};