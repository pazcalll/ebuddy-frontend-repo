"use server";

import { TAuthenticatedUser } from "@/components/entities/auth";
import { TMessage } from "@/components/entities/message";
import { ValidationError } from "@/components/exceptions/validation-error";
import dotenv from "dotenv";

dotenv.config();

export type TRegister = {
  email: string;
  password: string;
  confirmPassword: string;
};

const register = async (
  payload: TRegister
): Promise<TAuthenticatedUser | TMessage> => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error: TMessage = await response.json();
      throw new ValidationError<TMessage>(error);
    }

    const data: TAuthenticatedUser = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return error.errorObject;
    }
    throw error;
  }
};

export default register;
