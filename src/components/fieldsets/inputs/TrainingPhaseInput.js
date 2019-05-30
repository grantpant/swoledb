import React, { Fragment } from 'react';

const TrainingPhaseInput = (props) => (
  <Fragment>
    <label>
      <input
        type="checkbox"
        name="training-phase"
        value={props.trainingPhase.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
      {' '}{props.trainingPhase}
    </label>
    <br />
  </Fragment>
);

export default TrainingPhaseInput;