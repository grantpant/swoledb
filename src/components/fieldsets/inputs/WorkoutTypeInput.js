import React, { Fragment } from 'react';

const WorkoutTypeInput = (props) => (
  <Fragment>
    <input
      type="checkbox"
      name="workout-type"
      value={props.workoutType.toLowerCase()}
      checked={props.checked}
      onChange={props.onChange}
    />
    {' '}{props.workoutType}
    <br />
  </Fragment>
);

export default WorkoutTypeInput;