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
        <div className="fieldset-header">
          <h4>Training Phases</h4>
        </div>
        <div className="fieldset-body">
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