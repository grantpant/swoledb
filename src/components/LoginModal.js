import React, { Component } from 'react';
import Modal from 'react-modal';
import { LOG_IN_USER } from '../queries';
import { client } from '../app';
import { history } from '../routers/AppRouter';

Modal.setAppElement(document.getElementById('root'));

class LoginModal extends Component {
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

    // Pack up variables
    const variables = {
      data: {
        username: this.state.username,
        password: this.state.password
      }
    };

    // Fire off mutation
    client.mutate({
      mutation: LOG_IN_USER,
      variables
    })
    .then((res) => {
      // Put the jwt into local storage
      localStorage.setItem('jwt', res.data.login.token);
      // Set isLoggedIn to true in Apollo cache
      client.writeData({
        data: {
          isLoggedIn: true
        }
      });
      // Send user to the dashboard
      history.push('/dashboard');
    })
    .catch((err) => console.error(err));
  };
  render() {
    return (
      <Modal
        className="modal"
        isOpen={this.props.openModal === 'login'}
        contentLabel="Login"
        onRequestClose={this.props.closeModal}
        closeTimeoutMS={200}
      >
        {this.props.openModal === 'login' && (
          <div className="modal__body">
            <h3 className="modal__title">Login</h3>
            <form onSubmit={this.login}>
              <input
                type="text"
                className="text-input"
                placeholder="username"
                autoFocus
                onChange={this.onUsernameChange}
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
                value="Login"
              />
            </form>
          </div>
        )}
      </Modal>
    );
  }
}

export default LoginModal;