/** @format */

import { configureStore } from '@reduxjs/toolkit';

import userDataSlice from './slices/userData.slice';
import searchSlice from './slices/search.slice';

export const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
    search: searchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
