import { rootReducer } from './root-reducer';
import { describe, test, expect } from '@jest/globals';

describe('Тестирование редьюсера [rootReducer]', () => {
  test('Тест на правильную инициализацию', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(Object.keys(initialState).sort()).toEqual(
      [
        'burgerIngredients',
        'burgerConstructor',
        'feed',
        'user',
        'auth',
        'orders'
      ].sort()
    );

    expect(initialState.burgerIngredients).toBeDefined();
    expect(initialState.burgerConstructor).toBeDefined();
    expect(initialState.feed).toBeDefined();
    expect(initialState.user).toBeDefined();
    expect(initialState.auth).toBeDefined();
    expect(initialState.orders).toBeDefined();

    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });
});
