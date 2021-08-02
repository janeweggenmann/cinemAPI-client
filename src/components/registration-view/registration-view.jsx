import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap-floating-label";

export function RegistrationView(props) {
  const [email, registerEmail] = useState('');
  const [username, registerUsername] = useState('');
  const [password, registerPassword] = useState('');
  const [birthday, registerBirthday] = useState('');


  const handleSubmit = () => {
    console.log(email, username, password, birthday);
    props.onRegistered(username);
  };

  const registerBack = () => {
    props.onRegisterBack();
  };

  return (
    <div className="registration-view">
      <h1 className="cinemapi_title-thin">Cinem<span className="cinemapi_title-thick">API</span></h1>
      <Form className="registration-form">
        <Form.Group className="mb-2">
          <Form.Text className="reg-form-text1">Please enter your information below to create an account.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalInput" value={email} onChange={e => registerEmail(e.target.value)}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
            type="email"
          >
            <Form.Control type="email" size="lg" placeholder="Email Address" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalInput" value={username} onChange={e => registerUsername(e.target.value)}>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control type="text" size="lg" placeholder="Username" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalPassword" value={password} onChange={e => registerPassword(e.target.value)}>
          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
            type="password"
          >
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formHorizontalInput">
          <Form.Control type="date" value={birthday} onChange={e => registerBirthday(e.target.value)} />
        </Form.Group>
        <Button type="button" variant="primary" onClick={handleSubmit}>Submit</Button>
        <Button type="button" variant="secondary" onClick={registerBack}>Back</Button>
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