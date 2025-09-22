import { describe, test, expect } from '@jest/globals';
import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  initialState
} from './constructor-slice';

describe('Тестирование слайса [constructor-slice]', () => {
  test('Добавление булки', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient({ type: 'bun', name: 'Булка' } as any)
    );

    expect(newState.constructorItems.bun).not.toBeNull();
    expect(newState.constructorItems.bun?.type).toBe('bun');
    expect(newState.constructorItems.bun).toHaveProperty('id');
  });

  test('Добавление ингредиента', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient({ type: 'main', name: 'Начинка' } as any)
    );

    const { ingredients } = newState.constructorItems;
    expect(ingredients).toHaveLength(1);
    expect(ingredients[0].type).toBe('main');
    expect(ingredients[0]).toHaveProperty('id');
  });

  test('Удаление ингредиента', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { id: '1', type: 'main', name: 'A' } as any,
          { id: '2', type: 'main', name: 'B' } as any
        ]
      }
    };

    const newState = constructorReducer(
      stateWithIngredients,
      removeIngredient('1')
    );

    const { ingredients } = newState.constructorItems;
    expect(ingredients).toHaveLength(1);
    expect(ingredients[0].name).toBe('B');
  });

  test('Изменение порядка ингредиентов', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { id: '1', type: 'main', name: 'A' } as any,
          { id: '2', type: 'main', name: 'B' } as any,
          { id: '3', type: 'main', name: 'C' } as any
        ]
      }
    };

    const newState = constructorReducer(
      stateWithIngredients,
      moveIngredient(0, 2)
    );

    const { ingredients } = newState.constructorItems;
    expect(ingredients.map((i) => i.name)).toEqual(['B', 'C', 'A']);
  });
});
