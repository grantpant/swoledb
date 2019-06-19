import React, { Component, Fragment } from 'react';

class ExerciseNameFieldset extends Component {
  render() {
    return (
      <Fragment>
        <fieldset className="fieldset">
          <div className="fieldset__header">
            <h4>Exercise Name</h4>
          </div>
          <div className="fieldset__exercise-name-body">
            <input
              className="fieldset__exercise-name-body__input"
              type="text"
              name="exercise-name"
              autoFocus
              placeholder="Enter exercise name"
              onChange={this.props.onChange}
              value={this.props.value}
            />
            <button
              className="fieldset__exercise-name-body__button"
              type="submit"
              disabled={this.props.buttonDisabled}
            >
              {this.props.value ? 'Save' : 'Add'} Exercise
            </button>
          </div>
        </fieldset>
        <br />
      </Fragment>
    );
  }
}

export default ExerciseNameFieldset;