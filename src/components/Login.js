import React, { Component, Fragment } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

class Login extends Component {
  state = {
    activeModal: undefined
  };
  openModal = (e) => {
    e.persist();
    this.setState(() => ({ activeModal: e.target.value }));
  };
  closeModal = () => {
    this.setState(() => ({ activeModal: undefined }));
  };
  render() {
    return (
      <Fragment>
        <div className="login-layout">
          <div className="login-layout__box">
            <h1>Welcome to SwoleDB</h1>
            <button
              className="button"
              value="login"
              onClick={this.openModal}
            >
              Login
            </button>
            <button
              className="button"
              value="signup"
              onClick={this.openModal}
            >
              Sign up
            </button>
          </div>
        </div>
        <LoginModal
          openModal={this.state.activeModal}
          closeModal={this.closeModal}
        />
        <SignupModal
          openModal={this.state.activeModal}
          closeModal={this.closeModal}
        />
      </Fragment>
    );
  }
}

export default Login;