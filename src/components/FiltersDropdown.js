import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'antd';
import BodySectionsFieldset from './fieldsets/BodySectionsFieldset';
import PrimaryMoversFieldset from './fieldsets/PrimaryMoversFieldset';
import MovementTypesFieldset from './fieldsets/MovementTypesFieldset';
import TrainingPhasesFieldset from './fieldsets/TrainingPhasesFieldset';
import WorkoutTypesFieldset from './fieldsets/WorkoutTypesFieldset';
import EquipmentFieldset from './fieldsets/EquipmentFieldset';

class FiltersDropdown extends Component {
  state = {
    dropdownOpen: false,
    subMenusOpen: {
      bodySections: false,
      primaryMovers: false,
      movementTypes: false,
      trainingPhases: false,
      workoutTypes: false,
      equipment: false
    }
  };

  dropdownRef = React.createRef();

  componentDidMount() {
    this.initState = { ...this.state };

    console.log(this.dropdownRef.current.clientHeight)

    // Register event listeners for closing dropdown menus
    document.addEventListener('keydown', this.closeDropdown);
    document.addEventListener('mousedown', this.closeDropdown);
  }
  componentWillUnmount() {
    // Remove event listeners when unmounting component
    document.removeEventListener('keydown', this.closeDropdown);
    document.removeEventListener('mousedown', this.closeDropdown);
  }

  closeDropdown = (e) => {
    // Return all state props to false (thus closing all dropdown menus) if the
    // `esc key is pressed or if user clicks outside of any open dropdown menu
    if (e.key === 'Escape' || !this.dropdownRef.current.contains(e.target)) {
      this.setState(() => ({ ...this.initState }));
    }
  };
  toggleDropdown = () => {
    // Open/close main dropdown menu
    this.setState((prevState) => (
      { dropdownOpen: !prevState.dropdownOpen }
    ));
  };
  toggleSubMenus = (e) => {
    const subMenu = e.target.title;
    let otherSubMenus = {};

    // Close any open submenu that wasn't clicked
    for (let key in this.state.subMenusOpen) {
      if (key !== subMenu) {
        otherSubMenus[key] = false;
      }
    }

    // Open/close submenu that was clicked, closing any other open one
    this.setState((prevState) => ({
      subMenusOpen: {
        [subMenu]: !prevState.subMenusOpen[subMenu],
        ...otherSubMenus
      }
    }));
  };

  render() {
    const iconStyles = {
      fontSize: '12px',
      height: '12px',
      marginLeft: '12px'
    };

    return (
      <div className="dropdown" ref={this.dropdownRef}>
        <div className="dropdown__toggle" onClick={this.toggleDropdown}>
          <span>Filters</span>
          <Icon type="down" style={{ fontSize: '12px', marginLeft: '6px' }} />
        </div>
        <CSSTransition
          in={this.state.dropdownOpen}
          timeout={400}
          classNames="dropdown__menu"
        >
          <div className="dropdown__menu">
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="bodySections"
            >
              Body Sections
              <Icon type="down" style={iconStyles} />
            </div>
            <CSSTransition
              in={this.state.subMenusOpen.bodySections}
              timeout={400}
              classNames="dropdown__menu__subitem"
            >
              <div className="dropdown__menu__subitem" style={{ '--client-height': '220.2px' }}>
                <BodySectionsFieldset
                  inputType="checkbox"
                  state={this.props.state.bodySections}
                  onChange={this.props.onBodySectionsChange}
                />
              </div>
            </CSSTransition>
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="primaryMovers"
            >
              Primary Movers
              <Icon type="down" style={iconStyles} />
            </div>
            <CSSTransition
              in={this.state.subMenusOpen.primaryMovers}
              timeout={400}
              classNames="dropdown__menu__subitem"
            >
              <div className="dropdown__menu__subitem" style={{ '--client-height': '247.27px' }}>
                <PrimaryMoversFieldset
                  inputType="checkbox"
                  state={this.props.state.primaryMovers}
                  onChange={this.props.onPrimaryMoversChange}
                />
              </div>
            </CSSTransition>
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="movementTypes"
            >
              Movement Types
              <Icon type="down" style={iconStyles} />
            </div>
            <CSSTransition
              in={this.state.subMenusOpen.movementTypes}
              timeout={400}
              classNames="dropdown__menu__subitem"
            >
              <div className="dropdown__menu__subitem" style={{ '--client-height': '81.45px' }}>
                <MovementTypesFieldset
                  inputType="checkbox"
                  state={this.props.state.movementTypes}
                  onChange={this.props.onMovementTypesChange}
                />
              </div>
            </CSSTransition>
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="trainingPhases"
            >
              Training Phases
              <Icon type="down" style={iconStyles} />
            </div>
            <CSSTransition
              in={this.state.subMenusOpen.trainingPhases}
              timeout={400}
              classNames="dropdown__menu__subitem"
            >
              <div className="dropdown__menu__subitem" style={{ '--client-height': '122.91px' }}>
                <TrainingPhasesFieldset
                  inputType="checkbox"
                  state={this.props.state.trainingPhases}
                  onChange={this.props.onTrainingPhasesChange}
                />
              </div>
            </CSSTransition>
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="workoutTypes"
            >
              Workout Types
              <Icon type="down" style={iconStyles} />
            </div>
            <CSSTransition
              in={this.state.subMenusOpen.workoutTypes}
              timeout={400}
              classNames="dropdown__menu__subitem"
            >
              <div className="dropdown__menu__subitem" style={{ '--client-height': '102.18px' }}>
                <WorkoutTypesFieldset
                  inputType="checkbox"
                  state={this.props.state.workoutTypes}
                  onChange={this.props.onWorkoutTypesChange}
                />
              </div>
            </CSSTransition>
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="equipment"
            >
              Equipment
              <Icon type="down" style={iconStyles} />
            </div>
            <CSSTransition
              in={this.state.subMenusOpen.equipment}
              timeout={400}
              classNames="dropdown__menu__subitem"
            >
              <div className="dropdown__menu__subitem" style={{ '--client-height': '475.27px' }}>
                <EquipmentFieldset
                  inputType="checkbox"
                  state={this.props.state.equipment}
                  onChange={this.props.onEquipmentChange}
                />
              </div>
            </CSSTransition>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default FiltersDropdown;