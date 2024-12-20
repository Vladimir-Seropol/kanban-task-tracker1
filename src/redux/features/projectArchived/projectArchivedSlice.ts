/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-cycle */
import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type projectArhivedState = {
  arhived: {
    id: number;
    name: string;
    slug: string;
    is_archived: number;
    user_count: number;
  }[];
};

const initialState: projectArhivedState = {
  arhived: [
    {
      id: 1,
      name: 'Тестовый проект',
      slug: '',
      is_archived: 0,
      user_count: 0,
    },
  ],
};

const projectArhived = createSlice({
  name: 'projectArhived',
  initialState,
  reducers: {
    getProjectArchived: (
      state,

      action: PayloadAction<{
        id: number;
        name: string;
        slug: string;

        is_archived: number;

        user_count: number;
      }>,
    ) => {
      state.arhived.push({
        id: action.payload.id,
        name: action.payload.name,
        slug: action.payload.slug,
        is_archived: action.payload.is_archived,
        user_count: action.payload.user_count,
      });
    },
  },
});

export const { getProjectArchived } = projectArhived.actions;

export default projectArhived.reducer;

export const selectProjectArchived = (state: RootState) =>
  state.projectctArhived;
