import React, { Component } from 'react';
import { notification, Icon } from 'antd';
import { client } from '../app';
import ExerciseNameFieldset from './fieldsets/ExerciseNameFieldset';
import BodySectionsFieldset from './fieldsets/BodySectionsFieldset';
import PrimaryMoversFieldset from './fieldsets/PrimaryMoversFieldset';
import MovementTypesFieldset from './fieldsets/MovementTypesFieldset';
import TrainingPhasesFieldset, { trainingPhases } from './fieldsets/TrainingPhasesFieldset';
import WorkoutTypesFieldset, { workoutTypes } from './fieldsets/WorkoutTypesFieldset';
import EquipmentFieldset, { equipment } from './fieldsets/EquipmentFieldset';
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

    // Define arrays for query variables that will be lists
    const trainingPhases = [];
    const workoutTypes = [];
    const equipment = [];

    if (this.state.name !== '') {
      this.setState(() => ({ buttonDisabled: true }));

      // Build array of checked trainingPhases
      for (let key in this.state.trainingPhases) {
        if (this.state.trainingPhases[key]) {
          trainingPhases.push({ name: key });
        }
      }

      // Build array of checked workoutTypes
      for (let key in this.state.workoutTypes) {
        if (this.state.workoutTypes[key]) {
          workoutTypes.push({ name: key });
        }
      }

      // Build array for check equipment
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
      notification.open({
        icon: <Icon
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
        />,
        message: 'Your exercise has been added!',
        description: '(so much Swoleness)',
        placement: 'bottomRight'
      });
      console.log(result.data.createExercise);
      this.setState(() => this.initialState);
    })
    .catch((err) => console.warn(err));
  };

  render() {
    return (
      <form className="container container--add-exercise" onSubmit={this.onSubmit}>
        <ExerciseNameFieldset
          value={this.state.name}
          onChange={this.onNameChange}
          buttonDisabled={this.state.buttonDisabled}
        />
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