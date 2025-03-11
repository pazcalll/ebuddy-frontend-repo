import { TMessage } from "./message"

export type TValidationError = Partial<TMessage> & {
    success: boolean,
    error: TErrorContent,
}

export type TErrorContent = {
    issues: TIssue[],
    name: string
}

export type TIssue = {
    code: string,
    expected: string,
    received: string,
    path: string[],
    message: string,
}