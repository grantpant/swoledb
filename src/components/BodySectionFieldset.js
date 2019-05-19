import React, { Component } from 'react';
import BodySectionInput from './BodySectionInput';

const bodySections = ['Upper', 'Lower', 'Core', 'Full'];

class BodySectionFieldset extends Component {
  onChange = (e) => {
    const bodySection = e.target.value;
    this.props.onChange(bodySection);
  };
  checkedValue = (section) => {
    return this.props.inputType === 'radio'
      ? this.props.state === section.toLowerCase()
      : this.props.inputType === 'checkbox'
      ? this.props.state[section]
      : null;
  };
  render() {
    return (
      <fieldset id="body-section">
        <h4>Body Section</h4>
        {bodySections.map((section, i) => (
          <BodySectionInput
            key={i}
            type={this.props.inputType}
            section={section}
            checked={this.checkedValue.call(this, section)}
            onChange={this.onChange}
          />
        ))}
      </fieldset>
    );
  }
}

export default BodySectionFieldset;