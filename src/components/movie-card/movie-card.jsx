import React from "react";
import axios from "axios";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>
    );
  }
}