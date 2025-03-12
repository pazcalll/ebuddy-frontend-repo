import {
  TAuthenticatedUser,
  TAuthValidationError,
} from "@/components/entities/auth";
import { TMessage } from "@/components/entities/message";
import { ValidationError } from "@/components/exceptions/validation-error";

export type TLogin = {
  email: string;
  password: string;
};

const login = async (
  payload: TLogin
): Promise<TAuthenticatedUser | TAuthValidationError> => {
  try {
    const response = await fetch(process.env.BACKEND_URL + "/authentication", {
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

    const data: TAuthenticatedUser = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ValidationError) {
      return error.errorObject;
    }
    throw error;
  }
};

export default login;
