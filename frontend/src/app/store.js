import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import { authApi } from "../features/auth/authApi";
import { courseApi } from "../features/courses/courseApi";
import { lessonApi } from "../features/lesson/lessonApi";
import { enrollmentApi } from "../features/enrollment/enrollApi";
import { progressApi } from "../features/progress/progressApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [enrollmentApi.reducerPath]: enrollmentApi.reducer,
    [progressApi.reducerPath]: progressApi.reducer,

    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(courseApi.middleware)
      .concat(lessonApi.middleware)
      .concat(enrollmentApi.middleware)
      .concat(progressApi.middleware);
  },
});

export default store;
