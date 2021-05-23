import { Response } from "express";
import { environment } from "../config";
import {
	InternalErrorResponse,
	NotFoundResponse,
	AuthFailureResponse,
	BadRequestResponse
} from "./ApiResponse";

enum ErrorType {
	NOT_FOUND = "NotFoundError",
	INTERNAL = "InternalError",
	BAD_REQUEST = "BadRequestError",
	UNAUTHORIZED = "AuthFailureError"
}

export abstract class ApiError extends Error {
	constructor(public type: ErrorType, public message: string = "error") {
		super(type);
	}

	public static handle(err: ApiError, res: Response): Response {
		switch (err.type) {
			case ErrorType.NOT_FOUND:
				return new NotFoundResponse(err.message).send(res);
			case ErrorType.INTERNAL:
				return new InternalErrorResponse(err.message).send(res);
			case ErrorType.UNAUTHORIZED:
				return new AuthFailureResponse(err.message).send(res);
			case ErrorType.BAD_REQUEST:
				return new BadRequestResponse(err.message).send(res);
			default: {
				let message = err.message;
				if (environment == "prod") message = "Something went wrong!";
				return new InternalErrorResponse(message).send(res);
			}
		}
	}
}

export class NotFoundError extends ApiError {
	constructor(message = "Data does not exist.") {
		super(ErrorType.NOT_FOUND, message);
	}
}

export class InternalError extends ApiError {
	constructor(message = "Internal Error") {
		super(ErrorType.INTERNAL, message);
	}
}

export class BadRequestError extends ApiError {
	constructor(message = "Bad Request") {
		super(ErrorType.BAD_REQUEST, message);
	}
}

export class AuthFailureError extends ApiError {
	constructor(message = "Invalid Credentials") {
		super(ErrorType.UNAUTHORIZED, message);
	}
}
