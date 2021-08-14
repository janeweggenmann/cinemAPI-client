import "./movie-view.scss";

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  addFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://weggenmann-cinemapi.herokuapp.com/users/${username}/favorites/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(response => {
        alert("Added to favorites!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    const year = new Date(movie.Year);
    const movieyear = year.getFullYear();
    return (
      <Row className="movie-view">
        <Col md={12}>
          <img className="movie-view_image" src={movie.ImageURL} />
        </Col>
        <Col className="d-flex" md={12}>
          <div className="movie-view_wrapper">
            <h2 className="movie-view_title">{movie.Name}</h2>
            <div>
              <p className="movie-view_label">
                Overview:{" "}
                <span className="movie-view_text"> {movie.Description}</span>
              </p>
              <p className="movie-view_label">
                Year: <span className="movie-view_text"> {movieyear}</span>
              </p>
              <span className="movie-view_label">Directed By: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <span className="movie-view_text">{movie.Director.Name}</span>
              </Link>
              <p></p>
              <span className="movie-view_label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <span className="movie-view_text"> {movie.Genre.Name}</span>
              </Link>
              <p></p>
            </div>
            <div className="movie-view_buttons">
              <button
                className="movie-view_button"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </button>
              <button
                className="movie-view_favorite-button"
                value={movie.id}
                onClick={e => this.addFavorite(e, movie)}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Year: PropTypes.string,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    })
  }).isRequired
};

export default MovieView;
