"use server";

import { ValidationError } from '@/components/exceptions/validation-error';
import { TAuthResponse } from '@/components/types/auth-response'
import { TValidationError } from '@/components/types/validation-error'
import dotenv from 'dotenv'

dotenv.config()

export type TRegister = {
    email: string,
    password: string,
    confirmPassword: string,
}

const register = async (payload: TRegister): Promise<TAuthResponse | TValidationError> => {
    try {
        const response = await fetch(process.env.BACKEND_URL + '/register', {
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
    } catch (error: unknown) {
        if (error instanceof ValidationError) {
            return error.errorObject;
        }
        throw error;
    }
}

export default register;