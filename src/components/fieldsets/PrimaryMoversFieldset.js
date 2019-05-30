import React, { Component } from 'react';
import PrimaryMoverInput from './inputs/PrimaryMoverInput';
import { checkedValue } from '../../utils/helpers';

export const primaryMovers = ['Quads', 'Hamstrings', 'Glutes', 'Calves', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Core'];

class PrimaryMoversFieldset extends Component {
  onChange = (e) => {
    const primaryMover = e.target.value;
    this.props.onChange(primaryMover);
  };
  render() {
    return (
      <fieldset className="fieldset">
        <div className="fieldset__header">
          <h4>Primary Movers</h4>
        </div>
        <div className="fieldset__body">
          {primaryMovers.map((mover, i) => (
            <PrimaryMoverInput
              key={i}
              type={this.props.inputType}
              mover={mover}
              checked={checkedValue(this.props, mover)}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default PrimaryMoversFieldset;