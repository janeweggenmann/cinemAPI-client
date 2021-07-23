import React from "react";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view" onClick={() => { onBackClick(null); }}>
        <div className="movie-poster">
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Name}</span>
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