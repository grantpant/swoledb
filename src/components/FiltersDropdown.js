import React, { Component } from 'react';
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
        <button className="button dropdown__button" onClick={this.toggleDropdown}>
          Filters
          <Icon type="down" style={{ fontSize: '12px', marginLeft: '6px' }} />
        </button>
        {this.state.dropdownOpen && (
          <div className="dropdown__menu">
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="bodySections"
            >
              Body Sections
              <Icon type="right" style={iconStyles} />
            </div>
            {this.state.subMenusOpen.bodySections && (
              <div className="
                dropdown__menu__subitem
                dropdown__menu__subitem--body-sections
              ">
                <BodySectionsFieldset
                  inputType="checkbox"
                  state={this.props.state.bodySections}
                  onChange={this.props.onBodySectionsChange}
                />
              </div>
            )}
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="primaryMovers"
            >
              Primary Movers
              <Icon type="right" style={iconStyles} />
            </div>
            {this.state.subMenusOpen.primaryMovers && (
              <div className="
                dropdown__menu__subitem
                dropdown__menu__subitem--primary-movers
              ">
                <PrimaryMoversFieldset
                  inputType="checkbox"
                  state={this.props.state.primaryMovers}
                  onChange={this.props.onPrimaryMoversChange}
                />
              </div>
            )}
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="movementTypes"
            >
              Movement Types
              <Icon type="right" style={iconStyles} />
            </div>
            {this.state.subMenusOpen.movementTypes && (
              <div className="
                dropdown__menu__subitem
                dropdown__menu__subitem--movement-types
              ">
                <MovementTypesFieldset
                  inputType="checkbox"
                  state={this.props.state.movementTypes}
                  onChange={this.props.onMovementTypesChange}
                />
              </div>
            )}
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="trainingPhases"
            >
              Training Phases
              <Icon type="right" style={iconStyles} />
            </div>
            {this.state.subMenusOpen.trainingPhases && (
              <div className="
                dropdown__menu__subitem
                dropdown__menu__subitem--training-phases
              ">
                <TrainingPhasesFieldset
                  inputType="checkbox"
                  state={this.props.state.trainingPhases}
                  onChange={this.props.onTrainingPhasesChange}
                />
              </div>
            )}
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="workoutTypes"
            >
              Workout Types
              <Icon type="right" style={iconStyles} />
            </div>
            {this.state.subMenusOpen.workoutTypes && (
              <div className="
                dropdown__menu__subitem
                dropdown__menu__subitem--workout-types
              ">
                <WorkoutTypesFieldset
                  inputType="checkbox"
                  state={this.props.state.workoutTypes}
                  onChange={this.props.onWorkoutTypesChange}
                />
              </div>
            )}
            <div
              className="dropdown__menu__item"
              onClick={this.toggleSubMenus}
              title="equipment"
            >
              Equipment
              <Icon type="right" style={iconStyles} />
            </div>
            {this.state.subMenusOpen.equipment && (
              <div className="
                dropdown__menu__subitem
                dropdown__menu__subitem--equipment
              ">
                <EquipmentFieldset
                  inputType="checkbox"
                  state={this.props.state.equipment}
                  onChange={this.props.onEquipmentChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default FiltersDropdown;