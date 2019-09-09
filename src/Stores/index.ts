import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducer';
import loggerMiddleware from '@app/configs/LoggerMiddleware';

const defaultMiddlewares = [
  thunkMiddleware,
  promiseMiddleware(),
  loggerMiddleware,
];

const composedMiddlewares = (middlewares: any[]) => {

  return compose(applyMiddleware(...defaultMiddlewares, ...middlewares));
}
const initialize = (initialState: any = {}, middlewares: any = []) => {

  return createStore(rootReducer, initialState, composedMiddlewares(middlewares));
};

export default initialize;
