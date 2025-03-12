"use client";

import { decrement, increment } from "@/store/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";

const Profile = () => {
  const counterState = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>Profile</h1>
      <p>Counter: {counterState.count}</p>
      <button onClick={() => dispatch(increment())}>increase</button>
      <button onClick={() => dispatch(decrement())}>decrease</button>
    </div>
  );
};

export default Profile;
