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


  const handleRegister = (e) => {
    e.preventDefault();
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

  return (
    <div className="registration-view">
      <Form className="registration-form">
        <Form.Group className="mb-2">
          <Form.Text className="reg-form-text1">Please enter your information below to create an account.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalEmail">
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