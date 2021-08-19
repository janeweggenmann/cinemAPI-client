import "./movie-card.scss";

import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const movieyear = moment(movie.Year).format("YYYY");
    return (
      <Link to={`/movies/${movie._id}`}>
        <Card key={movie._id} variant="light" >
          <Card.Img variant="top" src={movie.ImageURL} />
          <Card.Body>
            <Card.Title>
              <h5 className="movie-card_title">{movie.Name} <span className="movie-card_year"> {movieyear}</span></h5>
            </Card.Title>
          </Card.Body>
        </ Card>
      </Link>
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
  }).isRequired
};