import React, { Component } from 'react';
import MediaQuery from 'react-responsive';

import { bodySections } from './fieldsets/BodySectionsFieldset';
import { primaryMovers } from './fieldsets/PrimaryMoversFieldset';
import { movementTypes } from './fieldsets/MovementTypesFieldset';
import { trainingPhases } from './fieldsets/TrainingPhasesFieldset';
import { workoutTypes } from './fieldsets/WorkoutTypesFieldset';
import { equipment } from './fieldsets/EquipmentFieldset';
import ExerciseListFilter from './ExerciseListFilter';
import ExerciseList from './ExerciseList';
import FiltersDropdown from './FiltersDropdown';
import { checkboxHandler, toCamelCase } from '../utils/helpers';

class ExerciseSearch extends Component{
  state = {
    bodySections: bodySections.reduce(
      (sections, section) => ({
        ...sections,
        [section.toLowerCase()]: false
      }), {}
    ),
    primaryMovers: primaryMovers.reduce(
      (movers, mover) => ({
        ...movers,
        [mover.toLowerCase()]: false
      }), {}
    ),
    movementTypes: movementTypes.reduce(
      (types, type) => ({
        ...types,
        [type.toLowerCase()]: false
      }), {}
    ),
    trainingPhases: trainingPhases.reduce(
      (phases, phase) => ({
        ...phases,
        [phase.toLowerCase()]: false
      }), {}
    ),
    workoutTypes: workoutTypes.reduce(
      (types, type) => ({
        ...types,
        [toCamelCase(type)]: false
      }), {}
    ),
    equipment: equipment.reduce(
      (equipment, piece) => ({
        ...equipment,
        [toCamelCase(piece)]: false
      }), {}
    )
  }

  initialState = { ...this.state };

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
  clearFilters = () => {
    this.setState(() => this.initialState);
  };

  render() {
    return (
      <div className="container container--search">
        <MediaQuery minWidth={720}>
          {(matches) => (
            matches ? (
              <div className="container--search__filter">
                <ExerciseListFilter
                  state={this.state}
                  onBodySectionsChange={this.onBodySectionsChange}
                  onPrimaryMoversChange={this.onPrimaryMoversChange}
                  onMovementTypesChange={this.onMovementTypesChange}
                  onTrainingPhasesChange={this.onTrainingPhasesChange}
                  onWorkoutTypesChange={this.onWorkoutTypesChange}
                  onEquipmentChange={this.onEquipmentChange}
                />
              </div>
            ) : (
              <div className="container--search__filter-dropdown">
                <FiltersDropdown
                  state={this.state}
                  onBodySectionsChange={this.onBodySectionsChange}
                  onPrimaryMoversChange={this.onPrimaryMoversChange}
                  onMovementTypesChange={this.onMovementTypesChange}
                  onTrainingPhasesChange={this.onTrainingPhasesChange}
                  onWorkoutTypesChange={this.onWorkoutTypesChange}
                  onEquipmentChange={this.onEquipmentChange}
                />
              </div>
            )
          )}
        </MediaQuery>
        <ExerciseList
          filters={this.state}
          clearFilters={this.clearFilters}
        />
      </div>
    );
  }
}

export default ExerciseSearch;