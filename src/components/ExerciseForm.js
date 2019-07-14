import React, { Component, Fragment } from 'react';
import { notification, Icon } from 'antd';
import { client } from '../app';
import { history } from '../routers/AppRouter';
import ExerciseNameFieldset from './fieldsets/ExerciseNameFieldset';
import BodySectionsFieldset from './fieldsets/BodySectionsFieldset';
import PrimaryMoversFieldset from './fieldsets/PrimaryMoversFieldset';
import MovementTypesFieldset from './fieldsets/MovementTypesFieldset';
import TrainingPhasesFieldset, { trainingPhases } from './fieldsets/TrainingPhasesFieldset';
import WorkoutTypesFieldset, { workoutTypes } from './fieldsets/WorkoutTypesFieldset';
import EquipmentFieldset, { equipment } from './fieldsets/EquipmentFieldset';
import { checkboxHandler, toCamelCase, isChecked, configCheckboxVars } from '../utils/helpers';
import { CREATE_EXERCISE, UPDATE_EXERCISE, DELETE_EXERCISE } from '../queries';

class ExerciseForm extends Component {
  state = {
    name: this.props.exercise ? this.props.exercise.name : '',
    bodySection: this.props.exercise ? this.props.exercise.bodySection : '',
    primaryMover: this.props.exercise ? this.props.exercise.primaryMover : '',
    movementType: this.props.exercise ? this.props.exercise.movementType : '',
    trainingPhases: trainingPhases.reduce(
      (phases, phase) => ({
        ...phases,
        [phase.toLowerCase()]: this.props.exercise
          ? isChecked(this.props.exercise.trainingPhases, phase)
          : false
      }), {}
    ),
    workoutTypes: workoutTypes.reduce(
      (types, type) => ({
        ...types,
        [toCamelCase(type)]: this.props.exercise
          ? isChecked(this.props.exercise.workoutTypes, type)
          : false
      }), {}
    ),
    equipment: equipment.reduce(
      (equipment, piece) => ({
        ...equipment,
        [toCamelCase(piece)]: this.props.exercise
          ? isChecked(this.props.exercise.equipment, piece)
          : false
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
    if (this.state.bodySection === bodySection) {
      this.setState(() => ({ bodySection: '' }));
    } else {
      this.setState(() => ({ bodySection }));
    }
  };
  onPrimaryMoverChange = (primaryMover) => {
    if (this.state.primaryMover === primaryMover) {
      this.setState(() => ({ primaryMover: '' }));
    } else {
      this.setState(() => ({ primaryMover }));
    }
  };
  onMovementTypeChange = (movementType) => {
    if (this.state.movementType === movementType) {
      this.setState(() => ({ movementType: '' }));
    } else {
      this.setState(() => ({ movementType }));
    }
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
  createExercise = async (e) => {
    e.preventDefault();

    if (this.state.name !== '') {
      this.setState(() => ({ buttonDisabled: true }));

      const { name, bodySection, primaryMover, movementType } = this.state;

      // Initialize arrays for mutation variables that will be lists
      const trainingPhases = [];
      const workoutTypes = [];
      const equipment = [];

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

      // Build array for checked equipment
      for (let key in this.state.equipment) {
        if (this.state.equipment[key]) {
          equipment.push({ name: key });
        }
      }

      // Pack up variables for mutation
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

      // Fire off mutation
      try {
        const newExercise = await client.mutate({
          mutation: CREATE_EXERCISE,
          variables
        });

        notification.open({
          icon: <Icon
            type="check-circle"
            theme="twoTone"
            twoToneColor="#52c41a"
          />,
          message: 'Your exercise has been added!',
          description: '(so much swoleness)',
          placement: 'bottomRight'
        });

        console.log(newExercise);
        this.setState(() => this.initialState);
      } catch (err) {
        console.warn(err);
      }
    }
  };
  updateExercise = async (e) => {
    e.preventDefault();

    this.setState(() => ({ buttonDisabled: true }));

    const { exercise } = this.props;
    const {
      name,
      bodySection,
      primaryMover,
      movementType,
      trainingPhases,
      workoutTypes,
      equipment
    } = this.state;

    const variables = {
      where: { id: exercise.id },
      data: {}
    };

    // If name was modified, add it to the mutation vars
    if (name !== exercise.name) {
      variables.data.name = name;
    }

    // If bodySection was modified, add it to the mutation vars
    if (bodySection !== exercise.bodySection) {
      variables.data.bodySection = bodySection;
    }

    // If primaryMover was modified, add it to the mutation vars
    if (primaryMover !== exercise.primaryMover) {
      variables.data.primaryMover = primaryMover;
    }

    // If movementType was modified, add it to the mutation vars
    if (movementType !== exercise.movementType) {
      variables.data.movementType = movementType;
    }

    // Configure mutation vars for any changed trainingPhases checkboxes
    variables.data.trainingPhases = configCheckboxVars(
      trainingPhases,
      exercise.trainingPhases,
      variables.data.trainingPhases
    );

    // Configure mutation vars for any changed workoutTypes checkboxes
    variables.data.workoutTypes = configCheckboxVars(
      workoutTypes,
      exercise.workoutTypes,
      variables.data.workoutTypes
    );

    // Configure mutation vars for any changed equipment checkboxes
    variables.data.equipment = configCheckboxVars(
      equipment,
      exercise.equipment,
      variables.data.equipment
    );

    // Fire off updateExercise mutation
    try {
      await client.mutate({
        mutation: UPDATE_EXERCISE,
        variables
      });

      history.push('/dashboard');

      notification.open({
        icon: <Icon
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
        />,
        message: 'Exercise updated successfully',
        placement: 'bottomRight'
      });
    } catch (err) {
      console.warn(err);
    }
  };
  deleteExercise = async () => {
    try {
      await client.mutate({
        mutation: DELETE_EXERCISE,
        variables: {
          where: { id: this.props.exercise.id }
        }
      });

      history.push('/dashboard');

      notification.open({
        icon: <Icon
          type="check-circle"
          theme="twoTone"
          twoToneColor="#52c41a"
        />,
        message: 'Exercise deleted successfully',
        placement: 'bottomRight'
      });

    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    return (
      <div className="container form-container">
        <form
          onSubmit={this.props.exercise ? this.updateExercise : this.createExercise}
        >
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
          <PrimaryMoversFieldset
            inputType="radio"
            state={this.state.primaryMover}
            onChange={this.onPrimaryMoverChange}
          />
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
          <EquipmentFieldset
            onChange={this.onEquipmentChange}
            state={this.state.equipment}
          />
        </form>
        {this.props.exercise && (
          <button
            className="delete-exercise-btn"
            onClick={this.deleteExercise}
          >
            Delete Exercise
          </button>
        )}
      </div>
    );
  }
}

export default ExerciseForm;