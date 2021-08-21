import "./registration-view.scss";

import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [email, registerEmail] = useState('');
  const [username, registerUsername] = useState('');
  const [password, registerPassword] = useState('');
  const [birthday, registerBirthday] = useState('');

  //relates to form validation
  const [usernameError, registerUsernameError] = useState({});
  const [passwordError, registerPasswordError] = useState({});
  const [emailError, registerEmailError] = useState({});
  const [birthdayError, registerBirthdayError] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    // only do POST action if form is valid
    const isValid = formValidation();
    if (isValid) {
      axios.post("https://weggenmann-cinemapi.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open(`/`, '_self');
        })
        .catch(e => {
          console.log("Error registering the user")
        });
    }
  }

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    const birthdayError = {};
    let isValid = true;

    if (username.length < 4 || username === '') {
      usernameError.notValidUsername = "Username must be at least 4 characters.";
      isValid = false;
    }
    if (password.length < 6 || password === '') {
      passwordError.notValidPassword = "Password must be at least 6 characters.";
      isValid = false;
    }
    if (!email || email.indexOf('@') === -1) {
      emailError.notValidEmail = "Please enter a valid email address.";
      isValid = false;
    }
    if (!birthday) {
      birthdayError.noBirthday = "Please enter your date of birth.";
      isValid = false;
    }

    registerUsernameError(usernameError);
    registerPasswordError(passwordError);
    registerEmailError(emailError);
    registerBirthdayError(birthdayError);
    return isValid;
  };

  return (
    <div className="registration-view">
      <Form className="registration-form">
        <Form.Group className="mb-2">
          <Form.Text className="reg-form-text1">Please enter your information below to create an account.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalEmail">
          {Object.keys(emailError).map((key) => {
            return (
              <div className="form-validation-error" key={key}>
                {emailError[key]}
              </div>
            );
          })}
          <FloatingLabel
            label="Email"
            className="mb-3"
            type="email"
          >
            <Form.Control
              required
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => registerEmail(e.target.value)} />
          </FloatingLabel>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formHorizontalUsername" >
          {Object.keys(usernameError).map((key) => {
            return (
              <div className="form-validation-error" key={key}>
                {usernameError[key]}
              </div>
            );
          })}
          <FloatingLabel
            label="Username"
            className="mb-3"
          >
            <Form.Control
              required
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => registerUsername(e.target.value)} />
          </FloatingLabel>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formHorizontalPassword" >
          {Object.keys(passwordError).map((key) => {
            return (
              <div className="form-validation-error" key={key}>
                {passwordError[key]}
              </div>
            );
          })}
          <FloatingLabel
            label="Password"
            className="mb-3"
          >
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => registerPassword(e.target.value)} />
          </FloatingLabel>
        </Form.Group>


        <Form.Group className="mb-3" controlId="formHorizontalInput">
          {Object.keys(birthdayError).map((key) => {
            return (
              <div className="form-validation-error" key={key}>
                {birthdayError[key]}
              </div>
            );
          })}
          <Form.Control
            required
            type="date"
            value={birthday}
            onChange={e => registerBirthday(e.target.value)} />
        </Form.Group>


        <Button type="button" variant="primary" onClick={handleRegister}>Submit</Button>
        <Link to={`/`}>
          <Button type="button" variant="secondary" >
            Back
          </Button>
        </Link>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  })
}