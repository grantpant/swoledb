import React, { Component } from 'react';
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
import { CREATE_EXERCISE, UPDATE_EXERCISE } from '../queries';

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
  createExercise = async (e) => {
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
  };

  updateExercise = async (e) => {
    e.preventDefault();

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
      where: { id: this.props.exercise.id },
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
      const updatedExercise = await client.mutate({
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

  render() {
    return (
      <form
        className="container exercise-form"
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

export default ExerciseForm;