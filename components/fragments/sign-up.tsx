"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Link from "next/link";

export default function SignUpCard() {
  const sxTextField = {
    width: "100%",
    mb: 2,
  };

  return (
    <Card className="w-full max-w-[28rem] sm:min-w-[24rem] sm:max-w-[30rem] shadow-lg rounded-lg overflow-hidden">
      <CardContent>
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
        <TextField label="email" variant="filled" sx={sxTextField} />
        <TextField
          onInput={(e) => console.log(e)}
          label="password"
          variant="filled"
          sx={sxTextField}
        />
        <TextField
          onInput={(e) => console.log(e)}
          label="confirmPassword"
          variant="filled"
          sx={sxTextField}
        />
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
        >
          Submit
        </Button>
      </CardActions>
      <div className="m-2">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </div>
    </Card>
  );
}
