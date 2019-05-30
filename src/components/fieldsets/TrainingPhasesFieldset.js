import React, { Component } from 'react';
import TrainingPhaseInput from './inputs/TrainingPhaseInput';

export const trainingPhases = ['Stability', 'Strength', 'Hypertrophy', 'Power'];

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
          {trainingPhases.map((trainingPhase, i) => {
            // Provide lowercase to dynamically-referenced
            // value in state from AddExerciseForm for the "checked" prop.
            const checkedValue = trainingPhase.toLowerCase();

            return (
              <TrainingPhaseInput
                key={i}
                trainingPhase={trainingPhase}
                checked={this.props.state[checkedValue]}
                onChange={this.onChange}
              />
            );
          })}
        </div>
      </fieldset>
    );
  }
}

export default TrainingPhasesFieldset;