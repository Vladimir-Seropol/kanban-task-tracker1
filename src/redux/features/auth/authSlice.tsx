/* eslint-disable no-param-reassign */
/* eslint-disable import/order */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-cycle */
import { RootState } from '../../../redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      document.cookie = `auth_token=${encodeURIComponent(action.payload.token)}; path=/; samesite=strict`;
      state.token = action.payload.token;
    },
  },
});

export const { setToken } = auth.actions;

export default auth.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.token;

export const selectUser = (state: { auth: RootState }) => state.auth;
