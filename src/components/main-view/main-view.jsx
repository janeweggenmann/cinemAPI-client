import React from "react";
import axios from "axios";
import "./main-view.scss";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


export class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
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

  //when movie is selected, update state from null to the selected movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //when a user logs in, update state from null to that user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //when a user clicks "register" button, take them to registration page
  onRegisterClick() {
    this.setState({
      register: "yes"
    });
  }

  //when back button is clicked on registration page, go back to sign in page
  onRegisterBack() {
    this.setState({
      register: null
    });
  }

  //when user registers, log the user and take them to movies view page
  onRegistered(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //if there is no user, show the LoginView
    if (register === "yes" && !user) return <RegistrationView
      onRegistered={user => this.onRegistered(user)}
      onRegisterBack={register => this.onRegisterBack(register)} />;

    if (!user) return <LoginView
      onLoggedIn={user => this.onLoggedIn(user)}
      onRegisterClick={register => this.onRegisterClick(register)} />;

    //if there are no movies, return blank
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
