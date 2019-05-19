import React from 'react';
import MovementTypeInput from './MovementTypeInput';

const movementTypes = ['Push', 'Pull'];

class MovementTypeFieldset extends React.Component {
  onChange = (e) => {
    const movementType = e.target.value;
    this.props.onChange(movementType);
  };
  checkedValue = (moveType) => {
    return this.props.inputType === 'radio'
      ? this.props.state === moveType.toLowerCase()
      : this.props.inputType === 'checkbox'
      ? this.props.state[moveType]
      : null;
  };
  render() {
    return (
      <fieldset id="movement-type">
        <h4>Movement Type</h4>
        {movementTypes.map((moveType, i) => (
          <MovementTypeInput
            key={i}
            type={this.props.inputType}
            moveType={moveType}
            checked={this.checkedValue.call(this, moveType)}
            onChange={this.onChange}
          />
        ))}
      </fieldset>
    );
  }
}

export default MovementTypeFieldset;