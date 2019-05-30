import React, { Component } from 'react';
import BodySectionInput from './inputs/BodySectionInput';
import { checkedValue } from '../../utils/helpers';

export const bodySections = ['Upper', 'Lower', 'Core', 'Full'];

class BodySectionsFieldset extends Component {
  onChange = (e) => {
    const bodySection = e.target.value;
    this.props.onChange(bodySection);
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
              checked={checkedValue(this.props, section)}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default BodySectionsFieldset;