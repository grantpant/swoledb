import React from 'react';

class WorkoutTypesFieldset extends React.Component {
  state = {
    warmUp: false,
    resistence: false,
    hiit: false
  };
  onChange = (e) => {
    const workoutType = e.target.value;
    this.setState((prevState) => ({ [workoutType]: !prevState[workoutType] }));
    this.props.onChange(workoutType);
  };
  render() {
    return (
      <fieldset id="workout-types" className="checkbox-set">
        <h4>Workout Types</h4>
        <label>
          Warm-up{' '}
          <input
            type="checkbox"
            name="workout-type"
            value="warmUp"
            checked={this.state.warmUp}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Resistence{' '}
          <input
            type="checkbox"
            name="workout-type"
            value="resistence"
            checked={this.state.resistence}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          H.I.I.T.{' '}
          <input
            type="checkbox"
            name="workout-type"
            value="hiit"
            checked={this.state.hiit}
            onChange={this.onChange}
          />
        </label>
      </fieldset>
    );
  }
}

export default WorkoutTypesFieldset;