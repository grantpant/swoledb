import React from 'react';
import WorkoutTypeInput from './inputs/WorkoutTypeInput';

const workoutTypes = ['Warm-up', 'Resistence', 'H.I.I.T.'];

class WorkoutTypesFieldset extends React.Component {
  onChange = (e) => {
    let workoutType = e.target.value;
    const hasHyphen = new RegExp(/(-[\w])/, 'g').test(workoutType);

    if (hasHyphen) {
      workoutType = workoutType.replace(/(-[\w])/g, (match) => (
        match[1].toUpperCase()
      ));
    }
    if (workoutType === 'h.i.i.t.') {
      workoutType = workoutType.replace(/\./g,'');
    }

    this.props.onChange(workoutType);
  };
  render() {
    return (
      <fieldset className="fieldset">
        <div className="fieldset__header">
          <h4>Workout Types</h4>
        </div>
        <div className="fieldset__body">
          {workoutTypes.map((workoutType, i) => (
            <WorkoutTypeInput
              key={i}
              workoutType={workoutType}
              checked={this.props.state[workoutType]}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default WorkoutTypesFieldset;