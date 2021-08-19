import "./profile-view.scss";
import React from "react";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";

export class ProfileView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onBirthdayChange = this.onBirthdayChange.bind(this);
    this.handleUpdateUser = this.handleUpdateUser.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      Username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      Password: event.target.value
    });
  }

  onEmailChange(event) {
    this.setState({
      Email: event.target.value
    });
  }

  onBirthdayChange(event) {
    this.setState({
      Birthday: event.target.value
    });
  }

  handleUpdateUser = (e) => {
    e.preventDefault();

    axios.put(`https://weggenmann-cinemapi.herokuapp.com/users/${username}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open(`/`, '_self');
      })
      .catch(e => {
        console.log("Error updating user information")
      });
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  //get user information by username
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://weggenmann-cinemapi.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: moment(response.data.Birthday).format("YYYY-MM-DD"),
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //allow a user to delete their account
  handleDeleteUser = (e) => {
    e.preventDefault();
    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');

      axios.delete(`https://weggenmann-cinemapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('Your account has been deleted.');
          window.open(`/`, '_self');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }


  render() {
    const { FavoriteMovies } = this.state;
    const { movies } = this.props;

    return (
      <div className="profile-view_wrapper">
        <h3 className="profile-view_headers"> Hello, {this.state.Username}!</h3>

        <Form className="profile-form">
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label>
                Email
              </Form.Label>
            </Col>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder={this.state.Email}
                value={this.state.Email}
                onChange={this.onEmailChange} />
            </Col>
          </Row>
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label >
                Username
              </Form.Label>
            </Col>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder={this.state.Username}
                value={this.state.Username}
                onChange={this.onUsernameChange} />
            </Col>
          </Row>
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label >
                Password
              </Form.Label>
            </Col>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="*******"
                value={this.state.Password}
                onChange={this.onPasswordChange} />
            </Col>
          </Row>
          <Row className="profile-form_row">
            <Col sm="3" className="profile-form_label">
              <Form.Label>
                Birthday
              </Form.Label>
            </Col>
            <Col sm="9">
              <Form.Control
                type="date"
                placeholder={this.state.Birthday}
                value={this.state.Birthday}
                onChange={this.onBirthdayChange} />
            </Col>
          </Row>
          <Form.Group className="profile-form_buttons">
            <Button type="button" variant="secondary" className="profile-update-button" onClick={this.handleUpdateUser}>
              Update Information
            </Button>
            <Button type="button" variant="danger" onClick={this.handleDeleteUser}>Delete Account</Button>
          </Form.Group>
        </Form>

        <h3 className="profile-view_headers">Favorite Movies</h3>
        {FavoriteMovies.length === 0 && <p>You have not added any movies to your list of favorites yet!</p>}
        <Row xs={1} sm={2} md={3} className="g-4">
          {FavoriteMovies.length > 0 &&
            movies.map((movie) => {
              if (movie._id === FavoriteMovies.find((favoriteMovie) => favoriteMovie === movie._id)) {
                return (
                  <Col key={movie._id}>
                    <Link to={`/movies/${movie._id}`}>
                      <Card key={movie._id} variant="light" className="profile-view_movie-card">
                        <Card.Img variant="top" src={movie.ImageURL} />
                        <Card.Body>
                          <Card.Title>
                            <h5 className="movie-card_title">{movie.Name} <span className="movie-card_year"> {moment(movie.Year).format("YYYY")}</span></h5>
                          </Card.Title>
                        </Card.Body>
                      </ Card>
                    </Link>
                  </Col>
                );
              }
            })}
        </Row>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Name: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};

export default ProfileView;
