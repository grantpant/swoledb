import React, { Fragment } from 'react';

const WorkoutTypeInput = (props) => (
  <Fragment>
    <label>
      <input
        type="checkbox"
        name="workout-type"
        value={props.workoutType.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
      {' '}{props.workoutType}
    </label>
    <br />
  </Fragment>
);

export default WorkoutTypeInput;