import React, { Component } from 'react';
import Modal from 'react-modal';
import { client } from '../app';
import { SIGN_UP_USER } from '../queries';
import { history } from '../routers/AppRouter';

Modal.setAppElement(document.getElementById('root'));

class SignupModal extends Component {
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
      <Modal
        className="modal"
        isOpen={this.props.openModal === 'signup'}
        contentLabel="Signup"
        onRequestClose={this.props.closeModal}
        closeTimeoutMS={200}
      >
        {this.props.openModal === 'signup' && (
          <div className="modal__body">
            <h3 className="modal__title">Sign Up</h3>
            <form onSubmit={this.signup}>
              <input
                type="text"
                className="text-input"
                placeholder="username"
                autoFocus
                onChange={this.onUsernameChange}
              />
              <br />
              <input
                type="text"
                className="text-input"
                placeholder="email"
                onChange={this.onEmailChange}
              />
              <br />
              <input
                type="password"
                className="text-input"
                placeholder="password"
                onChange={this.onPasswordChange}
              />
              <br />
              <input
                className="button"
                type="submit"
                value="Sign up"
              />
            </form>
          </div>
        )}
      </Modal>
    );
  }
}

export default SignupModal;