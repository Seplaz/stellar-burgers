import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi, updateUserApi } from '@api';
import { TUser } from '@utils-types';
import { TRegisterData } from '@api';
import { login, register, logout, checkAuth } from './auth-slice';

export const fetchUser = createAsyncThunk('user/fetchUser', getUserApi);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TRegisterData>) => {
    const data = await updateUserApi(userData);
    return data.user;
  }
);

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    userSelector: (state) => state.user,
    userLoadingSelector: (state) => state.isLoading,
    userErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export const { userSelector, userLoadingSelector, userErrorSelector } =
  userSlice.selectors;
export default userSlice.reducer;
