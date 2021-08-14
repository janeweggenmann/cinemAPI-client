import React from "react";
import axios from "axios";

import "./main-view.scss";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarBrand } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      movies: [],
      user: null
    };
  }

  //if user is already logged in, use their token and take them to movies page
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null
    });
  }

  //take a user to the movies page, using the auth data from when they log in
  getMovies(token) {
    axios
      .get("https://weggenmann-cinemapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  //when user registers, log the user and take them to movies view page
  onRegistered(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <div className="main-view">
        <Router>
          <Navbar>
            <Container>
              <NavbarBrand>
                <Link to={`/`}>
                  <h1 className="cinemapi_title-thin">
                    Cinem<span className="cinemapi_title-thick">API</span>
                  </h1>
                </Link>
              </NavbarBrand>
              <Navbar.Text>
                <Link to={`/users/${user}`}>
                  <p>{user}</p>
                </Link>
              </Navbar.Text>
              <button
                className="logout-button"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Logout
              </button>
            </Container>
          </Navbar>
          <Row>
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={user => this.onLoggedIn(user)}
                        onRegisterClick={register =>
                          this.onRegisterClick(register)
                        }
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map(movie => (
                  <Col
                    className="movie_card"
                    xs={12}
                    md={6}
                    lg={4}
                    key={movie._id}
                  >
                    <MovieCard movie={movie} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView
                      onRegisterBack={register => this.onRegisterBack(register)}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:Name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={user => this.onLoggedIn(user)}
                        onRegisterClick={register =>
                          this.onRegisterClick(register)
                        }
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <DirectorView
                      director={
                        movies.find(
                          movie => movie.Director.Name === match.params.Name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={user => this.onLoggedIn(user)}
                        onRegisterClick={register =>
                          this.onRegisterClick(register)
                        }
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <MovieView
                      movie={movies.find(
                        movie => movie._id === match.params.movieId
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:Name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={user => this.onLoggedIn(user)}
                        onRegisterClick={register =>
                          this.onRegisterClick(register)
                        }
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <GenreView
                      genre={
                        movies.find(
                          movie => movie.Genre.Name === match.params.Name
                        ).Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              exact
              path="/users/:Username"
              render={({ history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        onLoggedIn={data => this.onLoggedIn(data)}
                        onRegisterClick={register =>
                          this.onRegisterClick(register)
                        }
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView history={history} movies={movies} />
                  </Col>
                );
              }}
            />
          </Row>
        </Router>
      </div>
    );
  }
}

export default MainView;
