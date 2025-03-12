import { TFirebaseUserProfile } from "@/components/entities/firebaseUser";

export const setFirebaseUserProfile = (
  firebaseUserProfile: TFirebaseUserProfile
) => {
  return {
    type: "SET_FIREBASE_USER_PROFILE",
    payload: firebaseUserProfile,
  };
};

export const clearFirebaseUserProfile = () => {
  return {
    type: "CLEAR_FIREBASE_USER_PROFILE",
  };
};
