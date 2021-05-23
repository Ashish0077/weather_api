import { NextFunction, Request, Response } from "express";
import { environment } from "../config";
import { ApiError, InternalError } from "../core/ApiError";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof ApiError) {
		ApiError.handle(err, res);
	} else {
		if (environment == "development") {
			return res.status(500).send(err.message);
		}
		ApiError.handle(new InternalError(), res);
	}
};
