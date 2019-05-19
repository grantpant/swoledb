import React from 'react';

export default (props) => (
  <label>
    {props.workoutType}{' '}
    <input
      type="checkbox"
      name="workout-type"
      value={props.workoutType.toLowerCase().replace(/\./g,'')}
    />
  </label>
);