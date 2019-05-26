import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import ExerciseSearch from '../components/ExerciseSearch';
import AddExerciseForm from '../components/AddExerciseForm';
import Login from '../components/Login';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/search" component={ExerciseSearch} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;