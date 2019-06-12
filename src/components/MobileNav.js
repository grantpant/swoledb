import React, { Component, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import { client } from '../app';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { history } from '../routers/AppRouter';

class MobileNav extends Component {
  state = {
    menuOpen: false
  };

  navRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.closeNav);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeNav);
  }

  closeNav = ({ target }) => {
    const navDropdownNode = this.navRef.current;
    const menuIconNode = this.props.headerNavRef.current;
    // Close the nav menu if user clicks outside of it
    if (!navDropdownNode.contains(target) && !menuIconNode.contains(target)) {
      this.setState(() => ({ menuOpen: false }));
    }
  };
  toggleMenu = ({ target }) => {
    // Don't close menu if user clicked on link to current page
    if (!target.className.toString().includes('is-active')) {
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
    return (
      <Fragment>
        <Icon type="menu" onClick={this.toggleMenu} />
        <CSSTransition
          in={this.state.menuOpen}
          timeout={300}
          classNames="mobile-nav"
        >
          <div className="mobile-nav" ref={this.navRef}>
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
        </CSSTransition>
      </Fragment>
    );
  }
}

export default MobileNav;