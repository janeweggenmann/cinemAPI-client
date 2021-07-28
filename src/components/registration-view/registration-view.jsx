import React, { useState } from "react";
import PropTypes from "prop-types";
import "./registration-view.scss";

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
      <h1>Welcome to CinemAPI</h1>
      <p>Please enter your information below to create an account.</p>
      <form>
        <div className="registration-form">
          <label className="registration-label">
            Email:
            <input type="email" value={email} onChange={e => registerEmail(e.target.value)} />
          </label>
          <label className="registration-label">
            Username:
            <input type="text" value={username} onChange={e => registerUsername(e.target.value)} />
          </label>
          <label className="registration-label">
            Password:
            <input type="password" value={password} onChange={e => registerPassword(e.target.value)} />
          </label>
          <label className="registration-label">
            Date of Birth:
            <input type="date" value={birthday} onChange={e => registerBirthday(e.target.value)} />
          </label>
        </div>
        <button type="button" className="secondary-button" onClick={registerBack}>Back</button>
        <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
      </form>
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