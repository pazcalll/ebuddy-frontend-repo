import { configureStore } from "@reduxjs/toolkit";
import {
  counterReducer,
  firebaseUserProfileReducer,
  usersReducer,
} from "./slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    firebaseUserProfile: firebaseUserProfileReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
