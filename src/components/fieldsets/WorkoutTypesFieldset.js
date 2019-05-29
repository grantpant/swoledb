import React, { Component } from 'react';
import WorkoutTypeInput from './inputs/WorkoutTypeInput';

const workoutTypes = ['Warm-up', 'Resistence', 'H.I.I.T.'];

const toCamelCase = (workoutType) => {
  // It hasn't been "toLowerCased" yet if coming from the render method
  workoutType = workoutType.toLowerCase();
  const hasHyphen = new RegExp(/(-[\w])/, 'g').test(workoutType);

  if (hasHyphen) {
    workoutType = workoutType.replace(/(-[\w])/g, (match) => (
      match[1].toUpperCase()
    ));
  }
  if (workoutType === 'h.i.i.t.') {
    workoutType = workoutType.replace(/\./g,'');
  }

  return workoutType;
};

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