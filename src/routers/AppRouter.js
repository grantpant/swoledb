import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from '../components/Header';
import ExerciseSearch from '../components/ExerciseSearch';
import AddExercise from '../components/AddExercise';
import EditExercise from '../components/EditExercise';
import Login from '../components/Login';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PrivateRoute path="/dashboard" component={ExerciseSearch} />
      <PrivateRoute path="/add-exercise" component={AddExercise} />
      <PrivateRoute path="/edit-exercise/:id" component={EditExercise} />
    </Switch>
  </Router>
);

export default AppRouter;