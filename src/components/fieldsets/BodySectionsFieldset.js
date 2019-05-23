import React, { Component } from 'react';
import BodySectionInput from './inputs/BodySectionInput';

const bodySections = ['Upper', 'Lower', 'Core', 'Full'];

class BodySectionsFieldset extends Component {
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
      <fieldset className="fieldset">
        <div className="fieldset__header">
          <h4>Body Sections</h4>
        </div>
        <div className="fieldset__body">
          {bodySections.map((section, i) => (
            <BodySectionInput
              key={i}
              type={this.props.inputType}
              section={section}
              checked={this.checkedValue.call(this, section)}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default BodySectionsFieldset;