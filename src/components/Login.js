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
            <h1 className="login-layout__box__title">Welcome to SwoleDB</h1>
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
          <div className="login-layout__server-notice">
            <p>*** Note that if the server has been idle for awhile it will take ~15 seconds to respond the first request. ***</p>
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