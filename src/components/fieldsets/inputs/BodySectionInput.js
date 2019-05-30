import React, { Fragment } from 'react';

const BodySectionInput = (props) => (
  <Fragment>
    <label>
      <input
        type={props.type}
        name="body-section"
        value={props.section.toLowerCase()}
        checked={props.checked}
        onChange={props.onChange}
      />
      {' '}{props.section}
    </label>
    <br />
  </Fragment>
);

export default BodySectionInput;