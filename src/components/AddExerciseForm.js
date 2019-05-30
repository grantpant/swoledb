import React, { Component } from 'react';
import BodySectionsFieldset from './fieldsets/BodySectionsFieldset';
import PrimaryMoversFieldset from './fieldsets/PrimaryMoversFieldset';
import MovementTypesFieldset from './fieldsets/MovementTypesFieldset';
import TrainingPhasesFieldset, { trainingPhases } from './fieldsets/TrainingPhasesFieldset';
import WorkoutTypesFieldset, { workoutTypes } from './fieldsets/WorkoutTypesFieldset';
import EquipmentFieldset, { equipment } from './fieldsets/EquipmentFieldset';
import { client } from '../app';
import { checkboxHandler, toCamelCase } from '../utils/helpers';
import { CREATE_EXERCISE } from '../queries';

class AddExerciseForm extends Component {
  state = {
    name: '',
    bodySection: '',
    primaryMover: '',
    movementType: '',
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
    ),
    buttonDisabled: false
  };

  initialState = { ...this.state };

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  onBodySectionChange = (bodySection) => {
    this.setState(() => ({ bodySection }));
  };
  onPrimaryMoverChange = (primaryMover) => {
    this.setState(() => ({ primaryMover }));
  };
  onMovementTypeChange = (movementType) => {
    this.setState(() => ({ movementType }));
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
  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.name !== '') {
      this.setState(() => ({ buttonDisabled: true }));

      // Build array of checked trainingPhases
      const trainingPhases = [];
      for (let key in this.state.trainingPhases) {
        if (this.state.trainingPhases[key]) {
          trainingPhases.push({ name: key });
        }
      }

      // Build array of checked workoutTypes
      const workoutTypes = [];
      for (let key in this.state.workoutTypes) {
        if (this.state.workoutTypes[key]) {
          workoutTypes.push({ name: key });
        }
      }

      // Build array for check equipment
      const equipment = [];
      for (let key in this.state.equipment) {
        if (this.state.equipment[key]) {
          equipment.push({ name: key });
        }
      }
    }

    const { name, bodySection, primaryMover, movementType } = this.state;
    const variables = {
      data: {
        name,
        bodySection: bodySection === '' ? null : bodySection,
        primaryMover: primaryMover === '' ? null : primaryMover,
        movementType: movementType === '' ? null : movementType,
        trainingPhases: trainingPhases === [] ? null : trainingPhases,
        workoutTypes: workoutTypes === [] ? null : workoutTypes,
        equipment: equipment === [] ? null : equipment
      }
    };

    client.mutate({
      mutation: CREATE_EXERCISE,
      variables
    })
    .then((result) => {
      console.log(result.data.createExercise);
      this.setState(() => this.initialState);
    })
    .catch((err) => console.warn(err));
  };

  render() {
    return (
      <form className="container" onSubmit={this.onSubmit}>
        <fieldset className="fieldset">
          <div className="fieldset__header">
            <h4>Exercise Name</h4>
          </div>
          <div className="fieldset__exercise-name-body">
            <input
              className="fieldset__exercise-name-body__input"
              type="text"
              name="exercise-name"
              autoFocus
              placeholder="Enter exercise name"
              onChange={this.onNameChange}
              value={this.state.name}
            />
            <button className="button" type="submit" disabled={this.state.buttonDisabled}>Add Exercise</button>
          </div>
        </fieldset>
        <br />
        <BodySectionsFieldset
          inputType="radio"
          state={this.state.bodySection}
          onChange={this.onBodySectionChange}
        />
        <div className="form-column">
          <PrimaryMoversFieldset
            inputType="radio"
            state={this.state.primaryMover}
            onChange={this.onPrimaryMoverChange}
          />
        </div>
        <div className="form-column">
          <MovementTypesFieldset
            inputType="radio"
            state={this.state.movementType}
            onChange={this.onMovementTypeChange}
          />
          <TrainingPhasesFieldset
            onChange={this.onTrainingPhasesChange}
            state={this.state.trainingPhases}
          />
          <WorkoutTypesFieldset
            onChange={this.onWorkoutTypesChange}
            state={this.state.workoutTypes}
          />
        </div>
        <div className="form-column">
          <EquipmentFieldset
            onChange={this.onEquipmentChange}
            state={this.state.equipment}
          />
        </div>
      </form>
    );
  }
}

export default AddExerciseForm;