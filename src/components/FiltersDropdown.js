import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import BodySectionsFieldset from './fieldsets/BodySectionsFieldset';
import PrimaryMoversFieldset from './fieldsets/PrimaryMoversFieldset';
import MovementTypesFieldset from './fieldsets/MovementTypesFieldset';
import TrainingPhasesFieldset from './fieldsets/TrainingPhasesFieldset';
import WorkoutTypesFieldset from './fieldsets/WorkoutTypesFieldset';
import EquipmentFieldset from './fieldsets/EquipmentFieldset';

class FiltersDropdown extends Component {
  render() {
    const { SubMenu, Item } = Menu;

    const menu = (
      <Menu className="dropdown-menu">
        <SubMenu title="Body Sections">
          <Item className="dropdown-menu__item" disabled>
            <BodySectionsFieldset
              inputType="checkbox"
              state={this.props.state.bodySections}
              onChange={this.props.onBodySectionsChange}
            />
          </Item>
        </SubMenu>
      </Menu>
    );

    return (
      <div className="filters-dropdown">
        <Dropdown overlay={menu}>
          <div>Filters <Icon type="down" /></div>
        </Dropdown>
      </div>
    );
  }
}

export default FiltersDropdown;