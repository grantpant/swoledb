import React from 'react';

class TrainingPhasesFieldset extends React.Component {
  state = {
    stability: false,
    strength: false,
    hypertrophy: false,
    power: false
  };
  onChange = (e) => {
    const trainingPhase = e.target.value;
    // console.log(trainingPhase)
    this.setState((prevState) => ({ [trainingPhase]: !prevState[trainingPhase] }));
    this.props.onChange(trainingPhase);
  };
  render() {
    return (
      <fieldset id="trainingPhases" className="checkbox-set">
        <h4>Training Phases</h4>
        <label>
          Stability{' '}
          <input
            type="checkbox"
            name="trainingPhase"
            value="stability"
            checked={this.state.stability}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Strength{' '}
          <input
            type="checkbox"
            name="trainingPhase"
            value="strength"
            checked={this.state.strength}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Hypertrophy{' '}
          <input
            type="checkbox"
            name="trainingPhase"
            value="hypertrophy"
            checked={this.state.hypertrophy}
            onChange={this.onChange}
          />
        </label>
        <br />
        <label>
          Power{' '}
          <input
            type="checkbox"
            name="trainingPhase"
            value="power"
            checked={this.state.power}
            onChange={this.onChange}
          />
        </label>
      </fieldset>
    );
  }
}

export default TrainingPhasesFieldset;