import React, { Fragment } from 'react';

const TrainingPhaseInput = (props) => (
  <Fragment>
    <input
      type="checkbox"
      name="training-phase"
      value={props.trainingPhase.toLowerCase()}
      checked={props.checked}
      onChange={props.onChange}
    />
    {' '}{props.trainingPhase}
    <br />
  </Fragment>
);

export default TrainingPhaseInput;