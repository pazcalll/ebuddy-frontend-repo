"use server";

import {
  TAuthenticatedUser,
  TAuthValidationError,
  TLogin,
} from "@/components/entities/auth";
import { ValidationError } from "@/components/exceptions/validation-error";
import { cookies } from "next/headers";

export const login = async (
  payload: TLogin
): Promise<TAuthenticatedUser | TAuthValidationError> => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/login", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error: TAuthValidationError = await response.json();
      throw new ValidationError<TAuthValidationError>(error);
    }
    console.log(response);

    const data: TAuthenticatedUser = await response.json();
    (await cookies()).set("token", data.token);

    return data;
  } catch (error) {
    if (error instanceof ValidationError) {
      return error.errorObject;
    }
    throw error;
  }
};
