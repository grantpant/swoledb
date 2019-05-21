import React, { Fragment } from 'react';

const TrainingPhaseInput = (props) => (
  <Fragment>
    <label>
      {props.trainingPhase}{' '}
      <input
        type="checkbox"
        name="training-phase"
        value={props.trainingPhase.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
    <br />
  </Fragment>
);

export default TrainingPhaseInput;