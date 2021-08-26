import "./movie-view.scss";

import React from "react";
import axios from "axios";
import moment from "moment";

import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export class MovieView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getFavorites(accessToken);
  }

  componentDidUpdate(FavoriteMovies) {
    const accessToken = localStorage.getItem('token');
    this.getFavorites(accessToken);
  }

  //get favorite movies
  getFavorites(token) {
    const username = localStorage.getItem('user');
    const FavoriteMovies = this.state;

    axios.get(`https://weggenmann-cinemapi.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // when a user favorites a movie, add it to their favorites list via POST action to API 
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

  // when a user clicks remove favorite, remove from favorites list via DELETE action to API
  removeFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios.delete(`https://weggenmann-cinemapi.herokuapp.com/users/${username}/favorites/${this.props.movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        alert("Removed from favorites!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    const movieyear = moment(movie.Year).format("YYYY");
    const { FavoriteMovies } = this.state;

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
              {/*if this movie is already favorite, show the "remove favorite" button */}
              {FavoriteMovies.includes(movie._id) &&
                <button
                  className="movie-view_unfavorite-button"
                  value={movie.id}
                  onClick={e => this.removeFavorite(e, movie)}
                >
                  Remove from Favorites
                </button>
              }
              {/*if this movie is NOT already favorite, show the "add favorite" button */}
              {(FavoriteMovies.indexOf(movie._id) === -1) &&
                <button
                  className="movie-view_favorite-button"
                  value={movie.id}
                  onClick={e => this.addFavorite(e, movie)}
                >
                  Add to Favorites
                </button>
              }
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
  }).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
      })
    )
  })
};

export default MovieView;
