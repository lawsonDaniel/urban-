"use client";
import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./reducers/userSlice";
import persistedReducer from "./rootReducer";

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  // Add any additional configuration options here
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
