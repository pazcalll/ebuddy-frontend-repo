"use client";

import profile from "@/api/profile";
import { ValidationError } from "@/components/exceptions/validation-error";
import { setFirebaseUserProfile } from "@/store/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";

const Profile = () => {
  const firebaseUserProfileState = useAppSelector(
    (state) => state.firebaseUserProfile
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const firebaseUserProfile = async () => {
      try {
        const profileResponse = await profile();
        if ("message" in profileResponse && !("uid" in profileResponse))
          throw new ValidationError(profileResponse.message);
        else if (!("message" in profileResponse)) {
          console.log(profileResponse);
          dispatch(setFirebaseUserProfile(profileResponse));
        }
      } catch (error) {
        console.error(error);
      }
    };

    firebaseUserProfile();
    console.log(firebaseUserProfileState);
  }, []);

  return (
    <div>
      <h1>Firebase User</h1>
      <p>{firebaseUserProfileState?.uid}</p>
      <p>{firebaseUserProfileState?.email}</p>
    </div>
  );
};

export default Profile;
