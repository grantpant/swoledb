import React, { Fragment } from 'react';

const MovementTypeInput = (props) => (
  <Fragment>
    <label>
      {props.moveType}{' '}
      <input
        type={props.type}
        name="move-type"
        value={props.moveType.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
    <br />
  </Fragment>
);

export default MovementTypeInput;