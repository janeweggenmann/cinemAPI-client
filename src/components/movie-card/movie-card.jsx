import "./movie-card.scss";

import React from "react";
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