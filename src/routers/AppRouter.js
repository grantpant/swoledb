import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ExerciseSearch from '../components/ExerciseSearch';
import AddExerciseForm from '../components/AddExerciseForm';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AddExerciseForm} />
      <Route path="/search" component={ExerciseSearch} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;