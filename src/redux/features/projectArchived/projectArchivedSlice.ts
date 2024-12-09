import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// export interface Project {
//   id: number;
//   name: string;
//   slug: string;
//   logo: null;
//   is_favorite: boolean;
//   is_archived: number;
//   begin: string;
//   end: string;
// }
// export interface ProductState {
//   projectArhived:{};
// }

// const initialState = {
//   projectArhived: {[
//     id: 0,
//     name: '';
//     slug: string;
//     logo: null;
//     is_favorite: boolean;
//     is_archived: number;
//     begin: string;
//     end: string;
//   ]},
// };

const projectArhived = createSlice({
  name: 'projectArhived',
  initialState: {
    data: [
      {
        id: 0,
        name: '',
        slug: '',
        logo: null,
        is_favorite: false,
        is_archived: 0,
        begin: '',
        end: '',
      },
    ],
  },
  reducers: {
    getProjectArchived: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        slug: string;
        logo: null;
        is_favorite: boolean;
        is_archived: number;
        begin: string;
        end: string;
      }>,
    ) => {
      state.data.push({
        id: action.payload.id,
        name: action.payload.name,
        slug: action.payload.slug,
        logo: action.payload.logo,
        is_favorite: action.payload.is_favorite,
        is_archived: action.payload.is_archived,
        begin: action.payload.begin,
        end: action.payload.end,
      });
    },
  },
});

export const { getProjectArchived } = projectArhived.actions;

export default projectArhived.reducer;

export const selectProjectArchived = (state: RootState) =>
  state.projectctArhived;
