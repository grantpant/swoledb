import React, { Component } from 'react';
import { gql } from 'apollo-boost';

class SignupForm extends Component {
  state = {
    username: '',
    email: '',
    password: ''
  };
  onUsernameChange = (e) => {
    e.persist();
    this.setState(() => ({ username: e.target.value }));
  };
  onEmailChange = (e) => {
    e.persist();
    this.setState(() => ({ email: e.target.value }));
  };
  onPasswordChange = (e) => {
    e.persist();
    this.setState(() => ({ password: e.target.value }));
  };
  login = (e) => {
    e.preventDefault();

    const signupUser = gql`
      mutation($data: CreateUserInput!) {
        createUser(
          data: $data
        ) {
          user {
            username
            email
          }
          token
        }
      }
    `;
    const variables = {
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    };

    this.props.client.mutate({
      mutation: signupUser,
      variables
    })
    .then((res) => {
      console.log(res.data.createUser)
      localStorage.setItem('jwt', res.data.createUser.token);
      this.props.client.writeData({
        data: { isLoggedIn: true }
      });
    })
    .catch((err) => console.error(err));
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
            Email:{' '}
            <input type="text" onChange={this.onEmailChange} />
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

export default SignupForm;