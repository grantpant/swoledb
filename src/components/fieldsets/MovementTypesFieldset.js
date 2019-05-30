import React, { Component } from 'react';
import MovementTypeInput from './inputs/MovementTypeInput';
import { checkedValue } from '../../utils/helpers';

export const movementTypes = ['Push', 'Pull'];

class MovementTypesFieldset extends Component {
  onChange = (e) => {
    const movementType = e.target.value;
    this.props.onChange(movementType);
  };
  render() {
    return (
      <fieldset className="fieldset">
        <div className="fieldset__header">
          <h4>Movement Types</h4>
        </div>
        <div className="fieldset__body">
          {movementTypes.map((moveType, i) => (
            <MovementTypeInput
              key={i}
              type={this.props.inputType}
              moveType={moveType}
              checked={checkedValue(this.props, moveType)}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default MovementTypesFieldset;