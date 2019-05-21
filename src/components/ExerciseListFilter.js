import React, { Component, Fragment } from 'react';
import BodySectionsFieldset from './BodySectionsFieldset';
import PrimaryMoversFieldset from './PrimaryMoversFieldset';
import MovementTypesFieldset from './MovementTypesFieldset';
import TrainingPhasesFieldset from './TrainingPhasesFieldset';
import WorkoutTypesFieldset from './WorkoutTypesFieldset';
import EquipmentFieldset from './EquipmentFieldset';

class ExerciseListFilters extends Component {
  render() {
    return (
      <Fragment>
        <BodySectionsFieldset
          inputType="checkbox"
          state={this.props.state.bodySections}
          onChange={this.props.onBodySectionsChange}
        />
        <PrimaryMoversFieldset
          inputType="checkbox"
          state={this.props.state.primaryMovers}
          onChange={this.props.onPrimaryMoversChange}
        />
        <MovementTypesFieldset
          inputType="checkbox"
          state={this.props.state.movementTypes}
          onChange={this.props.onMovementTypesChange}
        />
        <TrainingPhasesFieldset
          state={this.props.state.trainingPhases}
          onChange={this.props.onTrainingPhasesChange}
        />
        <WorkoutTypesFieldset
          state={this.props.state.workoutTypes}
          onChange={this.props.onWorkoutTypesChange}
        />
        <EquipmentFieldset
          state={this.props.state.equipment}
          onChange={this.props.onEquipmentChange}
        />
      </Fragment>
    );
  }
}

export default ExerciseListFilters;