import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };
  login = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.login}>
          <input type="text" />
          <input type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;