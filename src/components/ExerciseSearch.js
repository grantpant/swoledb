import React, { Fragment } from 'react';
import ExerciseListFilter from './ExerciseListFilter';
import ExerciseList from './ExerciseList';

const ExerciseSearch = () => (
  <Fragment>
    <ExerciseListFilter />
    <ExerciseList />
  </Fragment>
);

export default ExerciseSearch;