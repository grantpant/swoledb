import React, { Fragment } from 'react';

const PrimaryMoverInput = (props) => (
  <Fragment>
    <label>
      {props.mover}{' '}
      <input
        type={props.type}
        name="primary-mover"
        value={props.mover.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
    <br />
  </Fragment>
);

export default PrimaryMoverInput;