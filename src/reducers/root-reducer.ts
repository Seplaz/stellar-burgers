import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../services/slices/ingredients-slice';
import constructorReducer from '../services/slices/constructor-slice';
import feedReducer from '../services/slices/feed-slice';
import userReducer from '../services/slices/user-slice';
import authReducer from '../services/slices/auth-slice';
import ordersReducer from '../services/slices/orders-slice';

export const rootReducer = combineReducers({
  burgerIngredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  user: userReducer,
  auth: authReducer,
  orders: ordersReducer
});
