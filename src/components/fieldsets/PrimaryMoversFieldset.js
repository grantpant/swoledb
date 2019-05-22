import React, { Component, Fragment } from 'react';
import PrimaryMoverInput from './inputs/PrimaryMoverInput';

const primaryMovers = ['Quads', 'Hamstrings', 'Glutes', 'Calves', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core'];

class PrimaryMoversFieldset extends Component {
  onChange = (e) => {
    const primaryMover = e.target.value;
    this.props.onChange(primaryMover);
  };
  checkedValue = (mover) => {
    return this.props.inputType === 'radio'
      ? this.props.state === mover.toLowerCase()
      : this.props.inputType === 'checkbox'
      ? this.props.state[mover]
      : null;
  };
  render() {
    return (
      <fieldset id="primary-mover">
        <div className="fieldset-header">
          <h4>Primary Movers</h4>
        </div>
        <div className="fieldset-body">
          {primaryMovers.map((mover, i) => (
            <PrimaryMoverInput
              key={i}
              type={this.props.inputType}
              mover={mover}
              checked={this.checkedValue.call(this, mover)}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default PrimaryMoversFieldset;