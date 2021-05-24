import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { getCustomRepository, getRepository } from "typeorm";
import { BadRequestError, NotFoundError } from "../../core/ApiError";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import UserPreferences from "../../database/model/UserPreferences";
import UserRepo from "../../database/repository/UserRepo";
import asyncHandler from "../../utils/asyncHandler";

const updateUserPreferences = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		if ((!req.body.city1 && !req.body.city2 && !req.body.city3) || !req.body.email)
			throw new BadRequestError("bad parameters");
		const userRepo = getCustomRepository(UserRepo);
		const user = await userRepo.findByEmail(req.body.email);
		if (!user) throw new NotFoundError("User does not exist.");
		const preferenceRepo = getRepository(UserPreferences);
		const userPreferences = {
			city1: req.body.city1 || user.userPreferences.city1,
			city2: req.body.city2 || user.userPreferences.city2,
			city3: req.body.city3 || user.userPreferences.city3
		};
		if (
			userPreferences.city1 == userPreferences.city2 ||
			userPreferences.city1 == userPreferences.city3 ||
			(userPreferences.city2 &&
				userPreferences.city3 &&
				userPreferences.city2 == userPreferences.city3)
		) {
			throw new BadRequestError("Duplicate cities.");
		}
		await preferenceRepo.update({ id: user.userPreferences.id }, userPreferences);

		new SuccessMsgResponse("Successfully updated user preferences.").send(res);
	}
);

export { updateUserPreferences };
