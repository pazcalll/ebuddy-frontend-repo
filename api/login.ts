import { ValidationError } from "@/components/exceptions/validation-error";
import { TAuthResponse } from "@/components/types/auth-response";
import { TValidationError } from "@/components/types/validation-error";

export type TLogin = {
    email: string,
    password: string,
}

const login = async (payload: TLogin): Promise<TAuthResponse | TValidationError> => {
    try {
        const response = await fetch(process.env.BACKEND_URL + '/authentication', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error: TValidationError = await response.json();
            throw new ValidationError<TValidationError>(error);
        }

        const data: TAuthResponse = await response.json();
        return data;
    } catch (error) {
        if (error instanceof ValidationError) {
            return error.errorObject;
        }
        throw error;
    }
}

export default login;