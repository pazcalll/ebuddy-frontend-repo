import { TFirebaseUserProfile } from "@/components/entities/firebaseUser";
import { createSlice } from "@reduxjs/toolkit";

export type ICounterState = {
  count: number;
};

const initialState: ICounterState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

const initialFirebaseUserProfile: TFirebaseUserProfile | null = null;

export const firebaseUserProfileSlice = createSlice({
  name: "firebaseUserProfile",
  initialState: initialFirebaseUserProfile,
  reducers: {
    setFirebaseUserProfile: (state, action) => {
      const newState = action.payload as TFirebaseUserProfile;
      return newState;
    },
    clearFirebaseUserProfile: (state) => {
      return null;
    },
  },
});

export const { setFirebaseUserProfile, clearFirebaseUserProfile } =
  firebaseUserProfileSlice.actions;
export const firebaseUserProfileReducer = firebaseUserProfileSlice.reducer;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
