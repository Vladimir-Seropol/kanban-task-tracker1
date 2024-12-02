import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

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
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      document.cookie = `token=${JSON.stringify(action.payload.token)}`;
      state.token = action.payload.token;
    },
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;

export const selectCurrentUser = (state: RootState) => state.authApi;
