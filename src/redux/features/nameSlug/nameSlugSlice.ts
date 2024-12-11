import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface nameSlugState {
  item: {
    slug: string;
  };
}

const initialState: nameSlugState = {
  item: {
    slug: '',
  },
};

const nameSlug = createSlice({
  name: 'nameSlug',
  initialState,
  reducers: {
    getNameSlug: (state, action: PayloadAction<string>) => {
      state.item.slug = action.payload;
    },
  },
});

export const { getNameSlug } = nameSlug.actions;

export default nameSlug.reducer;

export const selectNameSlug = (state: RootState) => state.slug;
