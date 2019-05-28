import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { client } from '../app';
import { history } from '../routers/AppRouter';

class LoginForm extends Component {
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

    // Define GraphQL mutation
    const loginUser = gql`
      mutation($data: LoginUserInput!) {
        login(data: $data) {
          user {
          id
          username
        }
        token
        }
      }
    `;

    // Pack up variables
    const variables = {
      data: {
        username: this.state.username,
        password: this.state.password
      }
    };

    // Fire off mutation
    client.mutate({
      mutation: loginUser,
      variables
    })
    .then((res) => {
      // Put the jwt into local storage
      localStorage.setItem('jwt', res.data.login.token);
      // Set isLoggedIn to true in Apollo cache
      client.writeData({
        data: { isLoggedIn: true }
      });
      history.push('/dashboard');
    })
    .catch((err) => console.error(err));
  };
  render() {
    return (
      <div className="login-form">
        <h3>Login</h3>
        <form onSubmit={this.login}>
          <label>
            username:{' '}
            <input type="text" onChange={this.onUsernameChange} />
          </label>
          <br />
          <label>
            password:{' '}
            <input type="password" onChange={this.onPasswordChange} />
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default LoginForm;