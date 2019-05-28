import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { client } from '../app';
import { GET_EXERCISES } from '../queries';

class ExerciseList extends Component {
  // componentDidMount() {
  //   // This is how to read data from Apollo store cache
  //   const isLoggedIn = gql`
  //     query {
  //       isLoggedIn @client
  //     }
  //   `;

  //   client.query({ query: isLoggedIn })
  //   .then((res) => console.log(res))
  //   .catch((err) => console.error(err.message));
  // }
  render() {
    // This function is processing our data from the search filter
    // into a format we can pass as the $filter variable to the GraphQL
    // query to filter our search.
    const consolidateFilters = (filters) => {
      let bodySections = [];
      let primaryMovers = [];
      let movementTypes = [];
      let trainingPhases = [];
      let workoutTypes = [];
      let equipment = [];

      const buildFilter = (section) => {
        for (let key in filters[section]) {
          if (!!filters[section][key]) {
            switch (section) {
              case 'bodySections':
                bodySections.push(key);
                break;
              case 'primaryMovers':
                primaryMovers.push(key);
                break;
              case 'movementTypes':
                movementTypes.push(key);
                break;
              case 'trainingPhases':
                trainingPhases.push(key);
                break;
              case 'workoutTypes':
                workoutTypes.push(key);
                break;
              case 'equipment':
                equipment.push(key);
                break;
            }
          }
        }
      };

      // Call the buildFilter once for every section we have.
      buildFilter('bodySections');
      buildFilter('primaryMovers');
      buildFilter('movementTypes');
      buildFilter('trainingPhases');
      buildFilter('workoutTypes');
      buildFilter('equipment');

      const filter = { AND: [] };

      // If the bodySections array got populated, add a bodySection_id to the filter
      if (bodySections.length !== 0) {
        filter.AND.push({ bodySection_in: bodySections });
      }
      // If the primaryMovers array got populated, add a primaryMover_in to the filter
      if (primaryMovers.length !== 0) {
        filter.AND.push({ primaryMover_in: primaryMovers });
      }
      if (movementTypes.length !== 0) {
        filter.AND.push({ movementType_in: movementTypes });
      }
      if (trainingPhases.length !== 0) {
        trainingPhases.forEach((trainingPhase) => {
          filter.AND.push({ trainingPhases_some: { name: trainingPhase } });
        });
      }
      if (workoutTypes.length !== 0) {
        workoutTypes.forEach((workoutType) => {
          filter.AND.push({ workoutTypes_some: { name: workoutType } });
        });
      }
      if (equipment.length !== 0) {
        equipment.forEach((equipmentPiece) => {
          filter.AND.push({ equipment_some: { name: equipmentPiece } });
        });
      }

      return filter.AND.length === 0 ? null : filter;
    };

    const filter = consolidateFilters(this.props.filters);
    // console.log(JSON.stringify(filter, null, 2))

    return (
      <div className="exercise-list">
        <div className="exercise-list__header">
          <h1>Exercise List</h1>
        </div>
        <Query
          query={GET_EXERCISES}
          variables={{ filter }}
          fetchPolicy="cache-and-network"
        >
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching...</div>
            if (error) return <div>Something happened...</div>

            return (
              <div className="exercise-list__items">
                {data.exercises.map((exercise, index) => (
                  <div key={index}>
                    <h4>{exercise.name}</h4>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ExerciseList;