/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс для состояния авторизации
export interface AuthState {
  token: string | null;
}

// Инициализация состояния
const initialState: AuthState = {
  token: null,
};

// Создание слайса
const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Экшен для установки токена
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      // Сохраняем токен в localStorage
      localStorage.setItem(
        'token',
        JSON.stringify({
          token: action.payload.token,
        }),
      );

      // Сохраняем токен в cookies
      document.cookie = `auth_token=${encodeURIComponent(action.payload.token)}; path=/; samesite=strict`;

      state.token = action.payload.token;
    },
  },
});

// Экспортируем экшн для использования в компонентах
export const { setUser } = auth.actions;

// Экспортируем редьюсер, чтобы использовать его в store
export default auth.reducer;

// Селектор для получения токена из состояния auth
// Этот селектор теперь возвращает токен, а не authApi
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.token;
