import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const registerClick = () => {
    props.onRegisterClick("yes");
  };

  return (
    <div className="login-view">
      <h1>Welcome to CinemAPI</h1>
      <p>Please enter your username and password below to log in.</p>
      <form className="login-form">
        <label className="login-label">
          Username:
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label className="login-label">
          Password:
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
      <p>Not a member?</p>
      <button type="button" className="secondary-button" onClick={registerClick}>Sign Up</button>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  })
}