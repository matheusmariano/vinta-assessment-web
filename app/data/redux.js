import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  /* eslint-disable global-require */
  routing: routerReducer,
  /* eslint-enable */
});

export default rootReducer;
