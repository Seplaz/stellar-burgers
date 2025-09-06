import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const fetchFeeds = createAsyncThunk(
  'feed/fetchFeeds',
  async () => await getFeedsApi()
);

type TFeedState = {
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  isLoading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      });
  }
});

export default feedSlice.reducer;
