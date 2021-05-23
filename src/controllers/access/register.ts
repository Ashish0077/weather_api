import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BadRequestError } from "../../core/ApiError";
import UserRepo from "../../database/repository/UserRepo";
import asyncHandler from "../../utils/asyncHandler";
import bcrypt from "bcrypt";
import { SuccessResponse } from "../../core/ApiResponse";
import _ from "lodash";

const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.name || !req.body.email || !req.body.password)
		throw new BadRequestError("Bad Parameters");
	const userRepo = getCustomRepository(UserRepo);
	const user = await userRepo.findByEmail(req.body.email);
	if (user) throw new BadRequestError("User already registered.");
	const passwordHash = await bcrypt.hash(req.body.password, 10);
	const createdUser = userRepo.create({
		name: req.body.name,
		email: req.body.email,
		password: passwordHash
	});
	await userRepo.save(createdUser);

	new SuccessResponse("User successfully created.", {
		user: _.omit(createdUser, ["password", "id"])
	}).send(res);
});

export { registerUser };
