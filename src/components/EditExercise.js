import React from 'react';
import { Query } from 'react-apollo';
import ExerciseForm from './ExerciseForm';
import { GET_EXERCISE } from '../queries';

const EditExercise = () => (
  <Query
    query={GET_EXERCISE}
    variables={{ exerciseId: { id: this.props.match.params.id } }}
  >
    {({ loading, error, data }) => (
      loading ? (
      <p>loading...</p>
      ) : error ? (
        <p>ERROR</p>
      ) : (
        <ExerciseForm exercise={data.exercise} />
      )
    )}
  </Query>
);

export default EditExercise;