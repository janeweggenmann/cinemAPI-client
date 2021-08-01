import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    const year = new Date(movie.Year);
    const movieyear = (year.getFullYear());
    return (
      <Row className="movie-view" onClick={() => { onBackClick(null); }}>
        <Col xs={12} md={6}>
          <img className="movie-view_image" src={movie.ImageURL} />
        </Col>
        <Col className="d-flex" xs={12} md={6}>
          <h2 className="movie-view_title">{movie.Name}</h2>
          <div>
            <p className="movie-view_label">Overview:  <span className="movie-view_text"> {movie.Description}</span></p>
            <p className="movie-view_label">Year:  <span className="movie-view_text"> {movieyear}</span></p>
            <p className="movie-view_label">Directed By:  <span className="movie-view_text"> {movie.Director.Name}</span></p>
            <p className="movie-view_label">Genre:  <span className="movie-view_text"> {movie.Genre.Name}</span></p>
          </div>
          <div className="d-flex align-items-start">
            <button className="movie-view_button">Back</button>
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
      Name: PropTypes.string,
      Description: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    })
  })
}