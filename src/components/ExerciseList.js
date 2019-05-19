import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

class ExerciseList extends Component {
  render() {
    const EXERCISE_QUERY = gql`
      {
        exercises {
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
    return (
      <Fragment>
        <h1>Exercise List</h1>
        <Query query={EXERCISE_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching..</div>
            if (error) return <div>Something happened...</div>

            const { exercises } = data;

            return (
              <div>
                {exercises.map((exercise, index) => (
                  <div key={index}>
                    <h3>{exercise.name}</h3>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default ExerciseList;