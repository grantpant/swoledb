import React, { Component } from 'react';
import { Query } from 'react-apollo';
import ExerciseForm from './ExerciseForm';
import { GET_EXERCISE } from '../queries';

class EditExercise extends Component {
  render() {
    return (
      <Query
        query={GET_EXERCISE}
        variables={{ exerciseId: { id: this.props.match.params.id } }}
      >
        {({ loading, error, data }) => {
          console.log(data)
          return loading ? (
          <p>loading...</p>
          ) : error ? (
            <p>ERROR</p>
          ) : (
            <ExerciseForm exercise={data.exercise} />
          )
        }}
      </Query>
    );
  }
}

export default EditExercise;