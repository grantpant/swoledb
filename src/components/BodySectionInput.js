import React, { Fragment } from 'react';

const BodySectionInput = (props) => (
  <Fragment>
    <label>
      {props.section}{' '}
      <input
        type={props.type}
        name="body-section"
        value={props.section.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
    </label>
    <br />
  </Fragment>
);

export default BodySectionInput;