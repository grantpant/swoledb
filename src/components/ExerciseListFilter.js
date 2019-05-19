import React, { Component, Fragment } from 'react';
import BodySectionFieldset from './BodySectionFieldset';
import PrimaryMoverFieldset from './PrimaryMoverFieldset';
import MovementTypeFieldset from './MovementTypeFieldset';
import TrainingPhasesFieldset from './TrainingPhasesFieldset';
import WorkoutTypesFieldset from './WorkoutTypesFieldset';
import EquipmentFieldset from './EquipmentFieldset';
import { checkboxHandler } from '../utils/helpers';

class ExerciseListFilters extends Component {
  state = {
    bodySections: {
      upper: false,
      lower: false,
      core: false,
      full: false
    },
    primaryMovers: {
      quads: false,
      hamstrings: false,
      glutes: false,
      calves: false,
      chest: false,
      back: false,
      shoulders: false,
      biceps: false,
      triceps: false,
      core: false
    },
    movementTypes: {
      push: false,
      pull: false
    },
    trainingPhases: {
      stability: false,
      strength: false,
      hypertrophy: false,
      power: false
    },
    workoutTypes: {
      warmUp: false,
      resistence: false,
      hiit: false
    },
    equipment: {
      barbell: false,
      barbellRack: false,
      dumbbells: false,
      bench: false,
      kettleBell: false,
      smithRack: false,
      cable: false,
      dipStation: false,
      romanChair: false,
      pullUpBar: false,
      trx: false,
      step: false,
      box: false,
      band: false,
      medicineBall: false,
      swissBall: false,
      bosuBall: false,
      foamRoller: false,
      cones: false,
      agilityLadder: false,
      miniHurdles: false
    }
  };
  onBodySectionsChange = (bodySection) => {
    this.setState((prevState) => (
      checkboxHandler(bodySection, prevState, 'bodySections')
    ));
  };
  onPrimaryMoversChange = (primaryMover) => {
    this.setState((prevState) => (
      checkboxHandler(primaryMover, prevState, 'primaryMovers')
    ));
  };
  onMovementTypesChange = (movementType) => {
    this.setState((prevState) => (
      checkboxHandler(movementType, prevState, 'movementTypes')
    ));
  };
  onTrainingPhasesChange = (trainingPhase) => {
    this.setState((prevState) => (
      checkboxHandler(trainingPhase, prevState, 'trainingPhases')
    ));
  };
  onWorkoutTypesChange = (workoutType) => {
    this.setState((prevState) => (
      checkboxHandler(workoutType, prevState, 'workoutTypes')
    ));
  };
  onEquipmentChange = (equipmentPiece) => {
    this.setState((prevState) => (
      checkboxHandler(equipmentPiece, prevState, 'equipment')
    ));
  };
  render() {
    return (
      <Fragment>
        <BodySectionFieldset
          inputType="checkbox"
          state={this.state.bodySections}
          onChange={this.onBodySectionsChange}
        />
        <PrimaryMoverFieldset
          inputType="checkbox"
          state={this.state.primaryMovers}
          onChange={this.onPrimaryMoversChange}
        />
        <MovementTypeFieldset
          inputType="checkbox"
          state={this.state.movementTypes}
          onChange={this.onMovementTypesChange}
        />
        <TrainingPhasesFieldset onChange={this.onTrainingPhasesChange} />
        <WorkoutTypesFieldset onChange={this.onWorkoutTypesChange} />
        <EquipmentFieldset onChange={this.onEquipmentChange} />
      </Fragment>
    );
  }
}

export default ExerciseListFilters;