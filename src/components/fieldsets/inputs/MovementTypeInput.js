import React, { Fragment } from 'react';

const MovementTypeInput = (props) => (
  <Fragment>
    <input
      type={props.type}
      name="move-type"
      value={props.moveType.toLowerCase()}
      checked={props.checked}
      onChange={props.onChange}
    />
    {' '}{props.moveType}
    <br />
  </Fragment>
);

export default MovementTypeInput;