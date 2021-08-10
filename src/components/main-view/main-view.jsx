import React from "react";
import axios from "axios";
import "./main-view.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


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

  //if user is already logged in, use their token and take them to movies page
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  //when movie is selected, update state from null to the selected movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //when a user logs in, update state from null to that user's username
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    //store token and username in local storage - this allows users to stay logged in
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  //remove locally stored token and username to log user out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  //take a user to the movies page, using the auth data from when they log in
  getMovies(token) {
    axios.get("https://weggenmann-cinemapi.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
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
        <Navbar expand="sm">
          <Container>
            <Navbar.Text>
              <h1 className="cinemapi_title-thin">Cinem<span className="cinemapi_title-thick">API</span></h1>
            </Navbar.Text>
            <button className="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</button>
          </Container>
        </Navbar>
        <Router>
          <Row>
            <Route exact path="/" render={() => {
              if (!user) return
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              return movies.map(movie => (
                <Col className="movie_card" xs={12} md={6} lg={4} key={movie._id}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />
            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col>
                <MovieView movie={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path="/directors/:Name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
            <Route path="/genres/:Name" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col>
                <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }
            } />
          </Row>
        </Router>
      </div>
    );
  }
}


