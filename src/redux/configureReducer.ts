import { combineReducers } from 'redux';

import { StoreState } from '../types';
import auth from '../components/Auth/reducer';

const configureReducer = () =>
  combineReducers<StoreState>({
    auth,
  });

export default configureReducer;
