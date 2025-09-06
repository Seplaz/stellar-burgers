import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  TLoginData,
  TRegisterData,
  getUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    const token = getCookie('accessToken');
    if (!token) {
      return rejectWithValue('No token');
    }

    try {
      const userData = await getUserApi();
      return userData;
    } catch (error) {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: TLoginData) => {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    return data;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (registerData: TRegisterData) => {
    const data = await registerUserApi(registerData);
    setCookie('accessToken', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
    return data;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await logoutApi();
  } catch (error) {
    console.log(`Ошибка при совершении выхода из профиля: ${error}`);
  }
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  localStorage.removeItem('refreshToken');
});

type TAuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthChecked: boolean;
};

const initialState: TAuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isAuthChecked: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    isAuthenticatedSelector: (state) => state.isAuthenticated,
    isLoadingSelector: (state) => state.isLoading,
    errorSelector: (state) => state.error,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка входа';
        state.isAuthChecked = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  }
});

export const { clearError, setAuthChecked } = authSlice.actions;
export const {
  isAuthenticatedSelector,
  isLoadingSelector,
  errorSelector,
  isAuthCheckedSelector
} = authSlice.selectors;
export default authSlice.reducer;
