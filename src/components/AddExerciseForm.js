import React from 'react';
import { gql } from 'apollo-boost';
import BodySectionFieldset from './BodySectionFieldset';
import PrimaryMoverFieldset from './PrimaryMoverFieldset';
import MovementTypeFieldset from './MovementTypeFieldset';
import TrainingPhasesFieldset from './TrainingPhasesFieldset';
import WorkoutTypesFieldset from './WorkoutTypesFieldset';
import EquipmentFieldset from './EquipmentFieldset';
import { client } from '../app';
import { checkboxHandler } from '../utils/helpers';

class AddExerciseForm extends React.Component {
  state = {
    name: '',
    bodySection: '',
    primaryMover: '',
    movementType: '',
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

    const createExercise = gql`
      mutation($data: CreateExerciseInput!) {
        createExercise(
          data: $data
        ) {
          name
          bodySection
          primaryMover
          movementType
          trainingPhases {
            name
          }
          workoutTypes {
            name
          }
          equipment {
            name
          }
        }
      }
    `;

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
      mutation: createExercise,
      variables
    })
      .then((result) => console.log(result.data.createExercise))
      .catch((err) => console.warn(err));
  };

  render() {
    return (
      <form className="form-container" onSubmit={this.onSubmit}>
        <fieldset className="name-fieldset">
          <label>
            <span className="name-label-span">Exercise Name:</span>
            <input
              type="text"
              name="exercise-name"
              autoFocus
              placeholder="enter exercise name"
              onChange={this.onNameChange}
              value={this.state.name}
              size="35"
            />
          </label>
          <div className="button-wrapper">
            <input type="submit" value="Submit" />
          </div>
        </fieldset>
        <br />
        <BodySectionFieldset
          inputType="radio"
          state={this.state.bodySection}
          onChange={this.onBodySectionChange}
        />
        <div className="form-column">
          <PrimaryMoverFieldset
            inputType="radio"
            state={this.state.primaryMover}
            onChange={this.onPrimaryMoverChange}
          />
        </div>
        <div className="form-column">
          <MovementTypeFieldset
            inputType="radio"
            state={this.state.movementType}
            onChange={this.onMovementTypeChange}
          />
          <TrainingPhasesFieldset onChange={this.onTrainingPhasesChange} />
          <WorkoutTypesFieldset onChange={this.onWorkoutTypesChange} />
        </div>
        <div className="form-column">
          <EquipmentFieldset onChange={this.onEquipmentChange} />
        </div>
      </form>
    );
  }
}

export default AddExerciseForm;