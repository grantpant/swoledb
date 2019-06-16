import React from 'react';
import { Query } from 'react-apollo';
import { Icon } from 'antd';
import { GET_EXERCISES } from '../queries';

const ExerciseList = (props) => {
  // This function is processing our data from the search filter
  // into a format we can pass as the $filter variable to the GraphQL
  // query to filter our search.
  const consolidateFilters = (filters) => {
    // Initialize our arrays for each section's filter strings
    let bodySections = [];
    let primaryMovers = [];
    let movementTypes = [];
    let trainingPhases = [];
    let workoutTypes = [];
    let equipment = [];

    // Build the arrays with all checked filter strings
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

    // Initialize the final filter object
    const filter = { AND: [] };

    // Build out the final filter object with all checked filters for each section:
    // For the first three, we're filtering against a single string:
    // If the bodySections array was populated, add a bodySection_id to the filter...
    if (bodySections.length !== 0) {
      filter.AND.push({ bodySection_in: bodySections });
    }
    // ...same for primaryMovers...
    if (primaryMovers.length !== 0) {
      filter.AND.push({ primaryMover_in: primaryMovers });
    }
    // ...and for movementTypes.
    if (movementTypes.length !== 0) {
      filter.AND.push({ movementType_in: movementTypes });
    }
    // For these three, we're filtering against arrays of strings,
    // which is a bit different:
    // For each filter criteria selected for trainingPhases,
    // add the appropriate query object to our filter.
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
    // Return the final filter object to use for our query unless the
    // filter.AND array is empty:
    return filter.AND.length === 0 ? null : filter;
  };

  const filter = consolidateFilters(props.filters);
  // console.log(JSON.stringify(filter, null, 2))

  const iconStyles = {
    fontSize: '10rem',
    margin: '4.8rem auto',
    width: '100%'
  };

  return (
    <div className="exercise-list">
      <div className="exercise-list__clear-btn__container">
        <button
          className="button"
          onClick={() => {
            props.clearFilters();
          }}
        >
          Clear Filters
        </button>
      </div>
      <div className="exercise-list__header">
        <h1>Exercise List</h1>
      </div>
      <Query
        query={GET_EXERCISES}
        variables={{ filter }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => (
          loading ? (
            <div>
              <Icon type="loading" style={iconStyles} />
            </div>
          ) : error ? (
            <div className="exercise-list__error">
              <Icon type="exclamation-circle" style={iconStyles} />
              <p>There was a problem getting your list from the server. <br /> Try a refresh?</p>
            </div>
          ) : data.exercises.length === 0 ? (
            <div className="exercise-list__empty">
              <Icon type="exclamation-circle" style={iconStyles} />
              <p>Looks like there aren't any exercises that match those filters. Try unselecting some or hitting the "Clear Filters" button.</p>
            </div>
          ) : (
            <div className="exercise-list__items">
              {data.exercises.map((exercise, index) => (
                <div key={index} className="exercise-list__item">
                  <p className="exercise-list__item__text">{exercise.name}</p>
                  <button className="exercise-list__item__edit-btn">Edit</button>
                </div>
              ))}
            </div>
          )
        )}
      </Query>
    </div>
  );
};

export default ExerciseList;