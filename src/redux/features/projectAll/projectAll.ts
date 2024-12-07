import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  projectAll: string;
}

const initialState: AuthState = {
  projectAll: '',
};

const projectAll = createSlice({
  name: 'projectAll',
  initialState,
  reducers: {
    setProjectAll: (state, action: PayloadAction<{ projectAll: string }>) => {
      sessionStorage.setItem(
        'Проекты',
        JSON.stringify(action.payload.projectAll),
      );
      state.projectAll = action.payload.projectAll;
    },
  },
});

export const { setProjectAll } = projectAll.actions;

export default projectAll.reducer;

export const selectprojectAll = (state: RootState) => state.projectAll;
