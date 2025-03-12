"use client";

import profile from "@/api/profile";
import users from "@/api/users";
import { TUser } from "@/components/entities/user";
import { ValidationError } from "@/components/exceptions/validation-error";
import { setFirebaseUserProfile, setUsers } from "@/store/slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Box, Button } from "@mui/material";

const Profile = () => {
  const firebaseUserProfileState = useAppSelector(
    (state) => state.firebaseUserProfile
  );
  const usersState = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

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

  const fetchAllUsers = async () => {
    try {
      const usersResponse = await users();
      console.log(usersResponse);
      if ("message" in usersResponse)
        throw new ValidationError(usersResponse.message);
      else if (!("message" in usersResponse)) {
        console.log(usersResponse);
        dispatch(setUsers(usersResponse as TUser[]));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: { sm: "block", md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        mx: { sm: 8, md: 0, xs: 8 },
        mt: { sm: 8, xs: 8 },
      }}
    >
      <Box className="mr-[2rem]">
        <h1>
          Firebase User <br />
          <Button variant="outlined" onClick={firebaseUserProfile}>
            Fetch Firebase User Data
          </Button>
        </h1>
        <p>UID: {firebaseUserProfileState?.uid}</p>
        <p>Email: {firebaseUserProfileState?.email}</p>
      </Box>
      <Box className="ml-[2rem] max-h-[50vh] overflow-auto">
        <h1>All Users</h1>
        <p>
          <Button variant="outlined" onClick={fetchAllUsers}>
            Fetch User Data
          </Button>
        </p>
        {usersState?.map((user, _index) => (
          <div key={_index}>
            Total Average Weight Ratings: {user.totalAverageWeightRatings}
            <br />
            Number Of Rents: {user.numberOfRents}
            <br />
            Recently Active: {user.recentlyActive}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Profile;
