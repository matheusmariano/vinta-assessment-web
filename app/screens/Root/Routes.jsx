import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function Routes() {
  return (
    <Switch>
      {/* eslint-disable global-require */}
      <Route
        component={require('../Home/').default}
        exact
        path="/"
      />
      {/* eslint-enable */}
    </Switch>
  );
}
