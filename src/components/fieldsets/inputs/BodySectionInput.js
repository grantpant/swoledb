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
    {' '}{props.section}
    <br />
  </Fragment>
);

export default BodySectionInput;