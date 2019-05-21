import React, { Component } from 'react';
import TrainingPhaseInput from './inputs/TrainingPhaseInput';

const trainingPhases = ['Stability', 'Strength', 'Hypertrophy', 'Power'];

class TrainingPhasesFieldset extends Component {
  onChange = (e) => {
    const trainingPhase = e.target.value;
    this.props.onChange(trainingPhase);
  };
  render() {
    return (
      <fieldset id="trainingPhases" className="checkbox-set">
        <h4>Training Phases</h4>
        {trainingPhases.map((trainingPhase, i) => (
          <TrainingPhaseInput
            key={i}
            trainingPhase={trainingPhase}
            checked={this.props.state[trainingPhase]}
            onChange={this.onChange}
          />
        ))}
      </fieldset>
    );
  }
}

export default TrainingPhasesFieldset;