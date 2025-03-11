"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Link from "next/link";
import login, { TLogin } from "@/api/login";

export default function LoginCard() {
  const [loginData, setLoginData] = React.useState<TLogin>({
    email: "",
    password: "",
  });
  const formRef = React.useRef<HTMLFormElement>(null);

  const sxTextField = {
    width: "100%",
    mb: 2,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(loginData);
      console.log(response);
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
            label="email"
            variant="filled"
            sx={sxTextField}
            onInput={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <TextField
            label="password"
            variant="filled"
            sx={sxTextField}
            type="password"
            onInput={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
          onClick={() => formRef.current?.dispatchEvent(new Event("submit", { cancelable: true }))}
        >
          Submit
        </Button>
      </CardActions>
      <div className="m-2">
        Don`t have an account? <Link href="/sign-up">Sign Up</Link>
      </div>
    </Card>
  );
}
