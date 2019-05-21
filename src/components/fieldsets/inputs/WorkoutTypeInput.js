import React, { Fragment } from 'react';

const WorkoutTypeInput = (props) => (
  <Fragment>
    <label>
      {props.workoutType}{' '}
      <input
        type="checkbox"
        name="workout-type"
        value={props.workoutType.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
    <br />
  </Fragment>
);

export default WorkoutTypeInput;