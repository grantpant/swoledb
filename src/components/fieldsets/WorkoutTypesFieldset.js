import React, { Component } from 'react';
import WorkoutTypeInput from './inputs/WorkoutTypeInput';
import { toCamelCase } from '../../utils/helpers';

const workoutTypes = ['Warm-up', 'Resistence', 'H.I.I.T.'];

class WorkoutTypesFieldset extends Component {
  onChange = (e) => {
    let workoutType = e.target.value;

    workoutType = toCamelCase(workoutType);

    this.props.onChange(workoutType);
  };
  render() {
    return (
      <fieldset className="fieldset">
        <div className="fieldset__header">
          <h4>Workout Types</h4>
        </div>
        <div className="fieldset__body">
          {workoutTypes.map((workoutType, i) => {
            const checkedValue = toCamelCase(workoutType);

            return (
              <WorkoutTypeInput
                key={i}
                workoutType={workoutType}
                checked={this.props.state[checkedValue]}
                onChange={this.onChange}
              />
            );
          })}
        </div>
      </fieldset>
    );
  }
}

export default WorkoutTypesFieldset;