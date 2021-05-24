import { NextFunction, Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { BadRequestError, NotFoundError } from "../../core/ApiError";
import UserRepo from "../../database/repository/UserRepo";
import asyncHandler from "../../utils/asyncHandler";
import bcrypt from "bcrypt";
import { SuccessResponse } from "../../core/ApiResponse";
import _ from "lodash";
import UserPreferences from "../../database/model/UserPreferences";

const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	// if any of the required parameters are missing it will throw an BadRequest Error
	if (!req.body.name || !req.body.email || !req.body.password || !req.body.preferences)
		throw new BadRequestError("Bad Parameters");

	// User must provide atleast city1 for registeration
	if (!req.body.preferences.city1) throw new BadRequestError("Atleast select city1");
	const userRepo = getCustomRepository(UserRepo);
	const preferencesRepo = getRepository(UserPreferences);
	const user = await userRepo.findByEmail(req.body.email);
	if (user) throw new NotFoundError("User already registered.");
	const preference = preferencesRepo.create({
		city1: req.body.preferences.city1,
		city2: req.body.preferences.city2,
		city3: req.body.preferences.city3
	});
	// This is will make sure no duplicate cities are added
	if (
		preference.city1 == preference.city2 ||
		preference.city1 == preference.city3 ||
		(preference.city2 && preference.city3 && preference.city2 == preference.city3)
	) {
		throw new BadRequestError("Duplicate cities.");
	}
	await preferencesRepo.save(preference);
	const passwordHash = await bcrypt.hash(req.body.password, 10);
	const createdUser = userRepo.create({
		name: req.body.name,
		email: req.body.email,
		password: passwordHash,
		userPreferences: preference
	});
	await userRepo.save(createdUser);

	new SuccessResponse("User successfully created.", {
		user: _.omit(createdUser, ["password", "id", "userPreferences"]),
		preferences: _.omit(preference, ["id"])
	}).send(res);
});

export { registerUser };
