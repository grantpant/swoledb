import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

class ExerciseList extends Component {
  render() {
    const EXERCISE_QUERY = gql`
      query($filter: ExerciseWhereInput) {
        exercises(where: $filter) {
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

    // This function is processing our data from the search
    // filter into a format we can pass to the GraphQL query
    // to filter our search.
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

      return filter.AND.length === 0 ? null : filter;
    };

    const filter = consolidateFilters(this.props.filters);
    console.log(JSON.stringify(filter, null, 2))

    return (
      <Fragment>
        <h1>Exercise List</h1>
        <Query query={EXERCISE_QUERY} variables={filter}>
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