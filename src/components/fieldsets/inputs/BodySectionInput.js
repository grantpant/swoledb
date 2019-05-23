import React, { Fragment } from 'react';

const BodySectionInput = (props) => (
  <Fragment>
    <input
      type={props.type}
      name="body-section"
      value={props.section.toLowerCase()}
      checked={props.checked}
      onChange={props.onChange}
    />
    <span>{' '}{props.section}</span>
    <br />
  </Fragment>
);

export default BodySectionInput;