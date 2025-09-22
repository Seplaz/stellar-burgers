import { jest, describe, test, expect } from '@jest/globals';

jest.mock(
  '@api',
  () => ({
    loginUserApi: jest.fn(),
    registerUserApi: jest.fn(),
    logoutApi: jest.fn(),
    getUserApi: jest.fn()
  }),
  { virtual: true }
);

jest.mock(
  '../../utils/cookie',
  () => ({
    deleteCookie: jest.fn(),
    getCookie: jest.fn(),
    setCookie: jest.fn()
  }),
  { virtual: true }
);

import reducer, {
  login,
  register,
  checkAuth,
  logout,
  initialState
} from './auth-slice';

describe('Тестирование слайса [auth-slice]', () => {
  test('login pending - isLoading меняется на true', () => {
    const newState = reducer(initialState, { type: login.pending.type });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('login fulfilled - isAuthenticated становится true, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const newState = reducer(stateWithLoading, {
      type: login.fulfilled.type,
      payload: {
        user: { name: 'Test' },
        accessToken: 'token',
        refreshToken: 'refresh'
      }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('login rejected - error записывается, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const error = 'Ошибка входа';
    const newState = reducer(stateWithLoading, {
      type: login.rejected.type,
      error: { message: error }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('register pending - isLoading меняется на true', () => {
    const newState = reducer(initialState, { type: register.pending.type });

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('register fulfilled - isAuthenticated становится true, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const newState = reducer(stateWithLoading, {
      type: register.fulfilled.type,
      payload: {
        user: { name: 'Test' },
        accessToken: 'token',
        refreshToken: 'refresh'
      }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('register rejected - error записывается, isLoading false', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const error = 'Ошибка регистрации';
    const newState = reducer(stateWithLoading, {
      type: register.rejected.type,
      error: { message: error }
    });

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(error);
  });

  test('checkAuth fulfilled - isAuthenticated и isAuthChecked становятся true', () => {
    const newState = reducer(initialState, {
      type: checkAuth.fulfilled.type,
      payload: { user: { name: 'Test' } }
    });

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('checkAuth rejected - isAuthenticated false, isAuthChecked true', () => {
    const newState = reducer(initialState, {
      type: checkAuth.rejected.type
    });

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
  });

  test('logout fulfilled - isAuthenticated становится false', () => {
    const authenticatedState = { ...initialState, isAuthenticated: true };
    const newState = reducer(authenticatedState, {
      type: logout.fulfilled.type
    });

    expect(newState.isAuthenticated).toBe(false);
  });
});
