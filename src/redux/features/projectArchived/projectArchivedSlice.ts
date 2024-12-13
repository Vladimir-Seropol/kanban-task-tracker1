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
interface Archived {
  id: number;
  name: string;
  slug: string;
  logo: null;
  is_favorite: boolean;
  is_archived: boolean;
  begin: string;
  end: string;
  user_count: number;
}
type projectArhivedState = {
  arhived: {
    id: number;
    name: string;
    slug: string;
    // logo?: null;
    is_archived: number;
    user_count: number;
  }[];
};
// type projectArhivedState = {
//   arhived: [];
// };
// type projectArhivedState = {
//   arhived: Archived[];
// };
// const initialState = [] as Archived[];
const initialState: projectArhivedState = {
  arhived: [
    {
      id: 1,
      name: 'Тестовый проект',
      slug: '',
      // logo: null,
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
        // logo: null;
        // is_favorite: boolean;
        is_archived: number;
        // begin: string;
        // end: string;
        user_count: number;
      }>,
    ) => {
      // state.arhived.push({
      //   id: action.payload.id,
      //   name: action.payload.name,
      //   slug: action.payload.slug,
      //   // logo: action.payload.logo,
      //   is_archived: action.payload.is_archived,
      //   user_count: action.payload.user_count,
      // });
      state.arhived.push({
        id: action.payload.id,
        name: action.payload.name,
        slug: action.payload.slug,
        // logo: action.payload.logo,
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
