import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view" onClick={() => { onBackClick(null); }}>
        <div className="movie-poster">
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-info">
          <div className="movie-title">
            <h2 className="value">{movie.Name}</h2>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
        </div>
        <button className="movie-card_button">Back</button>
      </div>
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