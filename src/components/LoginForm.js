import React, { Component } from 'react';
import { gql } from 'apollo-boost';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };
  onUsernameChange = (e) => {
    e.persist();
    this.setState(() => ({ username: e.target.value }));
  };
  onPasswordChange = (e) => {
    e.persist();
    this.setState(() => ({ password: e.target.value }));
  };
  login = (e) => {
    e.preventDefault();

    const loginUser = gql``;
    const variables = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.client.mutate({
      mutation: loginUser,
      variables
    });
  };
  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.login}>
          <label>
            Username:{' '}
            <input type="text" onChange={this.onUsernameChange} />
          </label>
          <br />
          <label>
            Password:{' '}
            <input type="password" onChange={this.onPasswordChange} />
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;