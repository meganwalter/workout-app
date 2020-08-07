import React from 'react';
import CurrentWorkout from '../views/CurrentWorkout';
import WorkoutHistory from '../views/WorkoutHistory';
import { NativeRouter, Route } from 'react-router-native';
import { ROUTES } from '../static/Routes';

export const Router = () => {
  return (
    <NativeRouter>
      <Route exact path={ROUTES.HOME_ROUTE} component={WorkoutHistory} />
      <Route
        exact
        path={ROUTES.CURRENT_WORKOUT_ROUTE}
        component={CurrentWorkout}
      />
      <Route
        path={`${ROUTES.PAST_WORKOUT_ROUTE}/:id`}
        component={CurrentWorkout}
      />
    </NativeRouter>
  );
};
