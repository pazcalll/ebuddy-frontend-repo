"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Link from "next/link";
import register, { TRegister } from "@/api/register";

export default function SignUpCard() {
  const [signUpData, setSignUpData] = React.useState<TRegister>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const sxTextField = {
    width: "100%",
    mb: 2,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await register(signUpData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-[28rem] sm:min-w-[24rem] sm:max-w-[30rem] shadow-lg rounded-lg overflow-hidden">
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} method="POST">
          <Typography
            gutterBottom
            sx={{
              fontSize: 24,
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Sign Up
          </Typography>
          <TextField
            label="Email"
            variant="filled"
            sx={sxTextField}
            onInput={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            variant="filled"
            sx={sxTextField}
            type="password"
            onInput={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
          <TextField
            label="Confirm Password"
            variant="filled"
            type="password"
            sx={sxTextField}
            onInput={(e) =>
              setSignUpData({ ...signUpData, confirmPassword: e.target.value })
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
          onClick={() =>
            formRef.current?.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            )
          }
          type="button"
        >
          Submit
        </Button>
      </CardActions>
      <CardActions>
        <p className="w-full text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </CardActions>
    </Card>
  );
}
