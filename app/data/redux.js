import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  /* eslint-disable global-require */
  user: require('./user/redux').reducer,
  repositories: require('./repositories/redux').reducer,
  routing: routerReducer,
  /* eslint-enable */
});

export default rootReducer;
