import { jest, describe, test, expect } from '@jest/globals';
import reducer, { fetchIngredients, initialState } from './ingredients-slice';

jest.mock(
  '@api',
  () => ({
    getIngredientsApi: jest.fn()
  }),
  { virtual: true }
);

describe('Тестирование слайса [ingredients-slice]', () => {
  test('fetchIngredients pending - isLoading меняется на true', () => {
    const newState = reducer(initialState, {
      type: fetchIngredients.pending.type
    });
    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('fetchIngredients fulfilled - данные записываются в стор, isLoading false', () => {
    const initialState = {
      items: [],
      isLoading: true,
      error: null
    };

    const items = [
      { _id: '1', name: 'Булка', type: 'bun' } as any,
      { _id: '2', name: 'Соус', type: 'sauce' } as any
    ];

    const newState = reducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: items
    });

    const { items: resultItems, isLoading } = newState;
    expect(resultItems).toEqual(items);
    expect(isLoading).toBe(false);
  });

  test('fetchIngredients rejected - error записывается, isLoading false', () => {
    const initialState = {
      items: [],
      isLoading: true,
      error: null
    };

    const error = 'Ошибка получения ингредиентов';
    const newState = reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: error }
    });

    expect(newState.error).toBe(error);
    expect(newState.isLoading).toBe(false);
  });
});
