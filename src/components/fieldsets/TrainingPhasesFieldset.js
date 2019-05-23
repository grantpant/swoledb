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
      <fieldset className="fieldset">
        <div className="fieldset__header">
          <h4>Training Phases</h4>
        </div>
        <div className="fieldset__body">
          {trainingPhases.map((trainingPhase, i) => (
            <TrainingPhaseInput
              key={i}
              trainingPhase={trainingPhase}
              checked={this.props.state[trainingPhase]}
              onChange={this.onChange}
            />
          ))}
        </div>
      </fieldset>
    );
  }
}

export default TrainingPhasesFieldset;