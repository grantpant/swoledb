import React, { Component, Fragment } from 'react';
import ExerciseListFilter from './ExerciseListFilter';
import ExerciseList from './ExerciseList';
import { checkboxHandler } from '../utils/helpers';

class ExerciseSearch extends Component{
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
      trxStraps: false,
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
  }
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
        <ExerciseListFilter
          state={this.state}
          onBodySectionsChange={this.onBodySectionsChange}
          onPrimaryMoversChange={this.onPrimaryMoversChange}
          onMovementTypesChange={this.onMovementTypesChange}
          onTrainingPhasesChange={this.onTrainingPhasesChange}
          onWorkoutTypesChange={this.onWorkoutTypesChange}
          onEquipmentChange={this.onEquipmentChange}
        />
        <ExerciseList filters={this.state} />
      </Fragment>
    );
  }
}

export default ExerciseSearch;