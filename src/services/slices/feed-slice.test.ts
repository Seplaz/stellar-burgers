import { jest, describe, test, expect } from '@jest/globals';

jest.mock(
  '../../utils/burger-api',
  () => ({
    getFeedsApi: jest.fn()
  }),
  { virtual: true }
);

import reducer, { fetchFeeds, initialState } from './feed-slice';

describe('Тестирование слайса [feed-slice]', () => {
  test('fetchFeeds pending - isLoading меняется на true', () => {
    const newState = reducer(initialState, { type: fetchFeeds.pending.type });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('fetchFeeds fulfilled - данные записываются в стор, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const payload = {
      orders: [{ _id: '1', status: 'done' }] as any,
      total: 100,
      totalToday: 10
    };

    const newState = reducer(stateWithLoading, {
      type: fetchFeeds.fulfilled.type,
      payload
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual(payload.orders);
    expect(newState.feed.total).toBe(payload.total);
    expect(newState.feed.totalToday).toBe(payload.totalToday);
  });

  test('fetchFeeds rejected - error записывается, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const error = 'Ошибка загрузки ленты';
    const newState = reducer(stateWithLoading, {
      type: fetchFeeds.rejected.type,
      error: { message: error }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
