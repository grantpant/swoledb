import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddExerciseForm from '../components/AddExerciseForm';

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AddExerciseForm} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;