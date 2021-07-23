import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: "60dbc6157af35137390c7d74",
          Title: "Silence of the Lambs",
          Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
          Image: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg"
        },
        {
          _id: "60dd29cbefba3a45116c9553",
          Title: "Home Alone",
          Description: "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation.",
          Image: "https://upload.wikimedia.org/wikipedia/en/7/76/Home_alone_poster.jpg"
        },
        {
          _id: "60dd2a71efba3a45116c9559",
          Title: "Cast Away",
          Description: "A FedEx executive undergoes a physical and emotional transformation after crash landing on a deserted island.",
          Image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Cast_away_film_poster.jpg/220px-Cast_away_film_poster.jpg"
        }
      ],
      selectedMovie: null
    };
  }

  componentDidMount() {
    axios
      .get("https://weggenmann-cinemapi.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
