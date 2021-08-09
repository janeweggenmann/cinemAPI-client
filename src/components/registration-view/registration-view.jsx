import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Formik } from "formik";

export function RegistrationView(props) {
  const [email, registerEmail] = useState('');
  const [username, registerUsername] = useState('');
  const [password, registerPassword] = useState('');
  const [birthday, registerBirthday] = useState('');

  const [validated, setValidated] = useState(false);

  const schema = yup.object().shape({
    Email: yup.string().required(),
    Username: yup.string().required(),
    Password: yup.string().required(),
    Birthday: yup.string().required(),
  })

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(email, username, password, birthday);
    props.onRegistered(username);

    setValidated(true);
  };

  const registerBack = () => {
    props.onRegisterBack();
  };

  return (
    <div className="registration-view">
      <h1 className="cinemapi_title-thin">Cinem<span className="cinemapi_title-thick">API</span></h1>
      <Formik
        validationSchema={schema}
        onSubmit={console.log}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form className="registration-form" noValidate validated={validated}>
            <Form.Group className="mb-2">
              <Form.Text className="reg-form-text1">Please enter your information below to create an account.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationFormikEmail">
              <FloatingLabel
                label="Email"
                className="mb-3"
                type="email"
              >
                <Form.Control
                  required
                  type="email"
                  name="Email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => registerEmail(e.target.value)}
                  isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationFormikUsername" >
              <FloatingLabel
                label="Username"
                className="mb-3"
                type="text"
              >
                <Form.Control
                  required
                  type="text"
                  name="Username"
                  placeholder="Username"
                  value={username}
                  onChange={e => registerUsername(e.target.value)}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHorizontalPassword" value={password} onChange={e => registerPassword(e.target.value)}>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
                type="password"
              >
                <Form.Control
                  required
                  type="password"
                  placeholder="Password" />
                <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formHorizontalInput" value={birthday} onChange={e => registerBirthday(e.target.value)} >
              <Form.Control
                required
                type="date"
              />
            </Form.Group>
            <Button type="button" variant="primary" onClick={handleSubmit}>Submit</Button>
            <Button type="button" variant="secondary" onClick={registerBack}>Back</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    Email: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  })
}