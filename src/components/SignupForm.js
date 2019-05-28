import React, { Component } from 'react';
import { client } from '../app';
import { SIGN_UP_USER } from '../queries';
import { history } from '../routers/AppRouter';

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
  signup = (e) => {
    e.preventDefault();

    // Pack up mutation variables nice and neat
    const variables = {
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    };

    // Fire off createUser mutation
    client.mutate({
      mutation: SIGN_UP_USER,
      variables
    })
    .then((res) => {
      localStorage.setItem('jwt', res.data.createUser.token);
      client.writeData({
        data: { isLoggedIn: true }
      });
      history.push('/dashboard');
    })
    .catch((err) => console.error(err));
  };
  render() {
    return (
      <div className="signup-form">
        <h3>Sign Up</h3>
        <form onSubmit={this.signup}>
          <label>
            username:{' '}
            <input type="text" onChange={this.onUsernameChange} />
          </label>
          <br />
          <label>
            email:{' '}
            <input type="text" onChange={this.onEmailChange} />
          </label>
          <br />
          <label>
            password:{' '}
            <input type="password" onChange={this.onPasswordChange} />
          </label>
          <br />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}

export default SignupForm;