import "./main-view.scss";

import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { NavbarBrand } from "react-bootstrap";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import MoviesList from '../movies-list/movies-list';
import { setMovies, setUser } from '../../actions/actions';

class MainView extends React.Component {

  //if user is already logged in, use their token and take them to movies page
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  //take a user to the movies page, using the auth data from when they log in
  getMovies(token) {
    axios
      .get("https://weggenmann-cinemapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //when a user logs in, update state from null to that user's username
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);
    //store token and username in local storage - this allows users to stay logged in
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  //remove locally stored token and username to log user out
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser("");
  }

  render() {
    let { movies, user } = this.props;

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
              <Navbar.Toggle />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <NavDropdown title={user} id="basic-nav-dropdown">
                  <NavDropdown.Item> <Link to={`/users/${user}`}>Profile Information</Link></NavDropdown.Item>
                  <NavDropdown.Item onClick={() => {
                    this.onLoggedOut();
                  }}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
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
                return <MoviesList movies={movies} />;
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

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);