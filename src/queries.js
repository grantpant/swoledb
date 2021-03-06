import { gql } from 'apollo-boost';

export const SIGN_UP_USER = gql`
  mutation($data: CreateUserInput!) {
    createUser(
      data: $data
    ) {
      user {
        username
        email
      }
      token
    }
  }
`;

export const LOG_IN_USER = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      user {
      id
      username
    }
    token
    }
  }
`;

export const GET_LOGGED_IN_STATUS = gql`
  query {
    isLoggedIn @client
  }
`;

export const CREATE_EXERCISE = gql`
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
      owner {
        id
        username
      }
    }
  }
`;

export const UPDATE_EXERCISE = gql`
  mutation(
    $data: ExerciseUpdateInput!,
    $where: ExerciseWhereUniqueInput!
  ) {
    updateExercise(
      data: $data,
      where: $where
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
      owner {
        id
        username
      }
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation($where: ExerciseWhereUniqueInput!) {
    deleteExercise(where: $where) {
      id
    }
  }
`;

export const GET_EXERCISES = gql`
  query($filter: ExerciseWhereInput) {
    exercises(where: $filter) {
      id
      name
      bodySection
      primaryMover
      movementType
      trainingPhases { name }
      workoutTypes { name }
      equipment { name }
    }
  }
`;

export const GET_EXERCISE = gql`
  query($exerciseId: ExerciseWhereUniqueInput!) {
    exercise(where: $exerciseId) {
      id
      name
      bodySection
      primaryMover
      movementType
      trainingPhases {
        id
        name
      }
      workoutTypes {
        id
        name
      }
      equipment {
        id
        name
      }
    }
  }
`;