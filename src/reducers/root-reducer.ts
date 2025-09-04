import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredients-slice';
import constructorReducer from '../slices/constructor-slice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer
});
