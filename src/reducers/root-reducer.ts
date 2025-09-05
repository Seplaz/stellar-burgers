import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredients-slice';
import constructorReducer from '../slices/constructor-slice';
import feedReducer from '../slices/feed-slice';
import userReducer from '../slices/user-slice';
import authReducer from '../slices/auth-slice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  auth: authReducer
});
