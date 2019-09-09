import { combineReducers } from 'redux';

import initReducer from './init';
import tagReducer from './Tag/TagReducers';
import brandReducer from './Brand/BrandReducers';
import imageReducer from './Image/ImageReducers';
import productReducer from './Product/ProductReducers';
import cartReducer from './Cart/CartReducer';
import cmtReducer from './Comment/CommentReducer';
import bannerReducer from './Banner/BannerReducer';
import languageReducer from './Language/LanguageReducer';
import blogReducer from './Blog/BlogReducer';
import contactReducer from './Contact/ContactReducer';

const rootReducer = combineReducers({
  initReducer,
  tagReducer,
  brandReducer,
  imageReducer,
  productReducer,
  cartReducer,
  cmtReducer,
  bannerReducer,
  languageReducer,
  blogReducer,
  contactReducer,
});

export default rootReducer;
