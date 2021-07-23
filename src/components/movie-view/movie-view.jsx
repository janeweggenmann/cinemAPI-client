import React from "react";
import axios from "axios";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view" onClick={() => { onBackClick(null); }}>
        <div className="movie-poster">
          <img src={movie.Image} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div>
          <button>Back</button>
        </div>
      </div>
    );
  }
}