"use client";

import { useAppSelector } from "@/store/store";

const Profile = () => {
  const counterState = useAppSelector((state) => state.counter);
  return (
    <div>
      <h1>Profile</h1>
      <p>Counter: {counterState.count}</p>
    </div>
  );
};

export default Profile;
