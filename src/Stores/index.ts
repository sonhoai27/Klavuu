import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducer';

const defaultMiddlewares = [
  thunk,
  promiseMiddleware,
];

const composedMiddlewares = (middlewares: any[]) => {

  return compose(applyMiddleware(...defaultMiddlewares, ...middlewares));
};
const initialize = (initialState: any = {}, middlewares: any = []) => {

  return createStore(rootReducer, initialState, composedMiddlewares(middlewares));
};

export default initialize;
