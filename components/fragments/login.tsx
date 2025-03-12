"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Link from "next/link";
import { TLogin } from "../entities/auth";
import { login } from "@/api/login";
import profile from "@/api/profile";
import { useAppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

export default function LoginCard() {
  const router = useRouter();
  const [loginData, setLoginData] = React.useState<TLogin>({
    email: "",
    password: "",
  });
  const formRef = React.useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const sxTextField = {
    width: "100%",
    mb: 2,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(loginData);
      console.log(response);
      const firebaseUserProfile = await profile();
      dispatch({
        type: "SET_FIREBASE_USER_PROFILE",
        payload: firebaseUserProfile,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-[28rem] sm:min-w-[24rem] sm:max-w-[30rem] shadow-lg rounded-lg overflow-hidden">
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Typography
            gutterBottom
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Login
          </Typography>
          <TextField
            label="Email"
            variant="filled"
            sx={sxTextField}
            onInput={(e) =>
              setLoginData({
                ...loginData,
                email: (e.target as HTMLInputElement).value,
              })
            }
          />
          <TextField
            label="Password"
            variant="filled"
            sx={sxTextField}
            type="password"
            onInput={(e) =>
              setLoginData({
                ...loginData,
                password: (e.target as HTMLInputElement).value,
              })
            }
          />
        </form>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="medium"
          color="success"
          sx={{
            mx: "auto",
            width: "100%",
          }}
          onClick={() => {
            formRef.current?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            );
          }}
        >
          Submit
        </Button>
      </CardActions>
      <CardActions>
        <p className="w-full text-center">
          Don`t have an account? <Link href="/sign-up">Sign Up</Link>
        </p>
      </CardActions>
    </Card>
  );
}
