import { combineReducers } from 'redux';

import initReducer from './init';
import tagReducer from './tag/TagReducers';
import brandReducer from './brand/BrandReducers';
import imageReducer from './image/ImageReducers';
import productReducer from './product/ProductReducers';

const rootReducer = combineReducers({
  initReducer,
  tagReducer,
  brandReducer,
  imageReducer,
  productReducer,
});

export default rootReducer;
