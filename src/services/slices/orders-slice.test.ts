import { jest, describe, test, expect } from '@jest/globals';

jest.mock(
  '@api',
  () => ({
    getOrdersApi: jest.fn()
  }),
  { virtual: true }
);

import reducer, { fetchOrders, initialState } from './orders-slice';

describe('Тестирование слайса [orders-slice]', () => {
  test('fetchOrders pending - isLoading меняется на true', () => {
    const newState = reducer(initialState, { type: fetchOrders.pending.type });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('fetchOrders fulfilled - orders записываются в стор, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const orders = [
      { _id: '1', status: 'done' },
      { _id: '2', status: 'pending' }
    ] as any;

    const newState = reducer(stateWithLoading, {
      type: fetchOrders.fulfilled.type,
      payload: orders
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual(orders);
  });

  test('fetchOrders rejected - error записывается, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const error = 'Ошибка загрузки заказов';
    const newState = reducer(stateWithLoading, {
      type: fetchOrders.rejected.type,
      error: { message: error }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
