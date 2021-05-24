import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { cities } from "../../utils/constants";
import { apiKey } from "../../config";
import fetch from "node-fetch";
import { IWeatherData } from "../../database/model/WeatherData";
import WeatherDataRepo from "../../database/repository/WeatherDataRepo";
import { SuccessMsgResponse, SuccessResponse } from "../../core/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { BadRequestError, InternalError, NotFoundError } from "../../core/ApiError";
import UserRepo from "../../database/repository/UserRepo";
import _ from "lodash";
import { convertTempUnit, fetchWeatherData } from "../../utils/helpers";

/* 
    @desc    Update weather data
    @route   POST /updateWeatherData
    @access  public
*/
const updateWeatherData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const weatherRepo = getCustomRepository(WeatherDataRepo);
	for (const city of cities) {
		const weatherData = await fetchWeatherData(city);
		await weatherRepo.insertOrUpdate(weatherData);
		console.log(`${city} updated!`);
	}
	new SuccessMsgResponse("Successfully updated weather data.").send(res);
});

/* 
    @desc    Get user weather data
    @route   GET /userWeatherData
    @access  Private
*/
const userWeatherData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	if (!req.body.email) throw new BadRequestError("Bad parameters.");
	const userRepo = getCustomRepository(UserRepo);
	const user = await userRepo.findByEmail(req.body.email);
	if (!user) throw new NotFoundError("User does not exist.");
	const userCities = [
		user.userPreferences.city1,
		user.userPreferences.city2,
		user.userPreferences.city3
	];
	let tempUnit: string = "kelvin";
	if (req.query.tempUnit != undefined) tempUnit = req.query.tempUnit as string;
	const weatherDataRepo = getCustomRepository(WeatherDataRepo);
	const weatherData: IWeatherData[] = [];
	for (const city of userCities) {
		if (city) {
			const data = await weatherDataRepo.findOne({ cityName: city });
			if (!data) throw new InternalError("Unable to fetch weather data.");
			weatherData.push(_.omit(convertTempUnit(data, tempUnit), ["id"]));
		}
	}
	new SuccessResponse("Success", { weatherData }).send(res);
});

export { updateWeatherData, userWeatherData };
