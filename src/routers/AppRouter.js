import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import Header from '../components/Header';
import ExerciseSearch from '../components/ExerciseSearch';
import AddExerciseForm from '../components/AddExerciseForm';
import Login from '../components/Login';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/dashboard" component={ExerciseSearch} />
      <PrivateRoute path="/add-exercise" component={AddExerciseForm} />
    </Switch>
  </Router>
);

export default AppRouter;