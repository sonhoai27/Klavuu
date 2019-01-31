import { combineReducers } from 'redux';

import initReducer from './init';
import tagReducer from './tag/TagReducers';
import brandReducer from './brand/BrandReducers';
import imageReducer from './image/ImageReducers';
import productReducer from './product/ProductReducers';
import cartReducer from './cart/CartReducer';
import cmtReducer from './comment/CommentReducer';
import bannerReducer from './banner/BannerReducer';

const rootReducer = combineReducers({
  initReducer,
  tagReducer,
  brandReducer,
  imageReducer,
  productReducer,
  cartReducer,
  cmtReducer,
  bannerReducer,
});

export default rootReducer;
