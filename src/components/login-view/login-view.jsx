import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap-floating-label";


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const registerClick = () => {
    props.onRegisterClick("yes");
  };

  return (
    <div className="login-view">
      <h1 className="cinemapi_title-thin">Cinem<span className="cinemapi_title-thick">API</span></h1>
      <p>Your place to find information on movies, genres, and directors.</p>
      <Form className="login-form">
        <Form.Group className="mb-2">
          <Form.Text className="login-form-text1">Please enter your username and password below to log in.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalInput" value={username} onChange={e => setUsername(e.target.value)}>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control type="text" size="lg" placeholder="Username" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalPassword" value={password} onChange={e => setPassword(e.target.value)}>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
            type="password"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form.Group>
        <Button type="button" variant="primary" onClick={handleSubmit}>Login</Button>
        <Form.Group className="mb-2">
          <Form.Text className="login-form-text2">Not a member yet?</Form.Text>
        </Form.Group>
        <Button type="button" variant="secondary" onClick={registerClick}>Create Account</Button>
      </Form>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  })
}