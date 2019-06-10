import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { history } from '../routers/AppRouter';

class MobileNav extends Component {
  state = {
    menuOpen: false
  };

  toggleMenu = () => {
    this.setState((prevState) => ({ menuOpen: !prevState.menuOpen }));
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
            <div className="mobile-nav__item">
              <NavLink to="/dashboard" className="mobile-nav__link" activeClassName="is-active">Exercise Search</NavLink>
            </div>
            <div className="mobile-nav__item">
              <NavLink exact to="/add-exercise" className="mobile-nav__link" activeClassName="is-active">Add Exercise</NavLink>
            </div>
            <div className="mobile-nav__item">
              <div
                className="mobile-nav__logout"
                onClick={() => {
                  client.writeData({
                    data: { isLoggedIn: false }
                  });
                  localStorage.clear();
                  history.push('/');
                }}
              >
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