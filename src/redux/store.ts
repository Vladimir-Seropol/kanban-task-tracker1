/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/AuthApi';
import authReducer from './features/auth/authSlice';
import { authUser } from './services/AuthUser';
import { projectUser } from './services/ProjectUser';
import { TaskSlug } from './services/TaskSlug';
import { TaskOne } from './services/TaskOne';
import projectArhivedReducer from './features/projectArchived/projectArchivedSlice';
import slugReducer from './features/nameSlug/nameSlugSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authUser.reducerPath]: authUser.reducer,
    [projectUser.reducerPath]: projectUser.reducer,
    [TaskSlug.reducerPath]: TaskSlug.reducer,
    [TaskOne.reducerPath]: TaskOne.reducer,

    auth: authReducer,
    projectctArhived: projectArhivedReducer,
    slug: slugReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(authUser.middleware)
      .concat(projectUser.middleware)
      .concat(TaskSlug.middleware)
      .concat(TaskOne.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
