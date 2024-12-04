import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../services/AuthApi';

export interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      document.cookie = `auth_token=${encodeURIComponent(action.payload.token)}; path=/; samesite=strict`;
      state.token = action.payload.token;
    },
    getUser: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setToken, getUser } = auth.actions;

export default auth.reducer;

// Селектор для получения токена из состояния auth
// Этот селектор теперь возвращает токен, а не authApi
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.token;
// export const selectCurrentUser = (state: RootState) => state.auth;
export const selectUser = (state: { auth: RootState }) => state.auth;
