import React from 'react';
import MovementTypeInput from './inputs/MovementTypeInput';

const movementTypes = ['Push', 'Pull'];

class MovementTypesFieldset extends React.Component {
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
              checked={this.checkedValue.call(this, moveType)}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default MovementTypesFieldset;