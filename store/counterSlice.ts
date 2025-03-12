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

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
