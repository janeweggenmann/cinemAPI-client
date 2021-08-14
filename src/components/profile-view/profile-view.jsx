import "./profile-view.scss";
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

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
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    return (
      <Row className="profile-view" >
        <Col className="d-flex" md={12}>
          <div className="profile-view_wrapper">
            <h2 className="profile-view_name"> Hello, {this.state.Username}!</h2>
            <h5 className="profile-view_label">
              Profile Information
            </h5>
            <p className="profile-view_label">
              Email:
              <span className="profile-view_text"> {this.state.Email}</span>
            </p>
            <p className="profile-view_label">
              Birthday:
              <span className="profile-view_text"> {this.state.Birthday}</span>
            </p>
          </div>
        </Col>
      </Row>
    );
  }
}

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    Favorites: PropTypes.array,
  }),
  movies: PropTypes.array.isRequired,
};

export default ProfileView;
