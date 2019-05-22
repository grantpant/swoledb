import React, { Fragment } from 'react';

const PrimaryMoverInput = (props) => (
  <Fragment>
    <input
      type={props.type}
      name="primary-mover"
      value={props.mover.toLowerCase()}
      checked={props.checked}
      onChange={props.onChange}
    />
    {' '}{props.mover}
    <br />
  </Fragment>
);

export default PrimaryMoverInput;