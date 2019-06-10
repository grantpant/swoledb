import React, { Component, Fragment } from 'react';
import { client } from '../app';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { history } from '../routers/AppRouter';

class MobileNav extends Component {
  state = {
    menuOpen: false
  };

  toggleMenu = (e) => {
    if (!e.target.className.toString().includes('is-active')) {
      this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
    }
  };
  logout = () => {
    client.writeData({
      data: { isLoggedIn: false }
    });
    localStorage.clear();
    history.push('/');
  };
  render() {
    const iconStyles = {
      fontSize: '3rem',
      color: '#a5afd7',
      position: 'relative',
      top: '3px'
    };
    return (
      <Fragment>
        <Icon type="menu" style={iconStyles} onClick={this.toggleMenu} />
        {this.state.menuOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav__item" onClick={this.toggleMenu}>
              <NavLink to="/dashboard" className="mobile-nav__link" activeClassName="is-active">Exercise Search</NavLink>
            </div>
            <div className="mobile-nav__item" onClick={this.toggleMenu}>
              <NavLink exact to="/add-exercise" className="mobile-nav__link" activeClassName="is-active">Add Exercise</NavLink>
            </div>
            <div className="mobile-nav__item">
              <div className="mobile-nav__logout" onClick={this.logout}>
                Logout
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default MobileNav;