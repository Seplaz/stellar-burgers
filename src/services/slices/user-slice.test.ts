import { jest, describe, test, expect } from '@jest/globals';

jest.mock(
  '@api',
  () => ({
    getUserApi: jest.fn(),
    updateUserApi: jest.fn()
  }),
  { virtual: true }
);

import reducer, { fetchUser, updateUser } from './user-slice';

describe('Тестирование слайса [user-slice]', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null
  };

  test('fetchUser pending - isLoading меняется на true', () => {
    const newState = reducer(initialState, { type: fetchUser.pending.type });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('fetchUser fulfilled - user записывается в стор, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const userData = { user: { name: 'User', email: 'user@test.com' } };

    const newState = reducer(stateWithLoading, {
      type: fetchUser.fulfilled.type,
      payload: userData
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.user).toEqual(userData.user);
  });

  test('fetchUser rejected - error записывается, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const error = 'Ошибка загрузки пользователя';
    const newState = reducer(stateWithLoading, {
      type: fetchUser.rejected.type,
      error: { message: error }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error);
  });

  test('updateUser pending - isLoading меняется на true', () => {
    const newState = reducer(initialState, { type: updateUser.pending.type });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('updateUser fulfilled - user обновляется в сторе', () => {
    const stateWithUser = {
      ...initialState,
      user: { name: 'user', email: 'user@test.com' } as any
    };
    const updatedUser = { name: 'newUser', email: 'newUser@test.com' };

    const newState = reducer(stateWithUser, {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    });

    expect(newState.user).toEqual(updatedUser);
  });

  test('updateUser rejected - error записывается, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const error = 'Ошибка обновления пользователя';
    const newState = reducer(stateWithLoading, {
      type: updateUser.rejected.type,
      error: { message: error }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error);
  });
});
