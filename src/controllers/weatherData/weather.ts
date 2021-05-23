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

const updateWeatherData = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const weatherRepo = getCustomRepository(WeatherDataRepo);
	for (const city of cities) {
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
		const response = await fetch(url);
		if (!response.ok) throw new InternalError("Unable to update weather data.");
		const data = await response.json();
		const weatherData: IWeatherData = {
			cityName: data.name,
			currTemp: data.main.temp,
			minTemp: data.main.temp_min,
			maxTemp: data.main.temp_max,
			windGust: data.wind.gust,
			windSpeed: data.wind.speed,
			windDeg: data.wind.deg,
			clouds: data.clouds.all,
			rain1h: data.rain?.["1h"] || null,
			rain3h: data.rain?.["3h"] || null
		};
		await weatherRepo.insertOrUpdate(weatherData);
	}
	new SuccessMsgResponse("Successfully updated weather data.").send(res);
});

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
	const weatherDataRepo = getCustomRepository(WeatherDataRepo);
	const weatherData: IWeatherData[] = [];
	for (const city of userCities) {
		if (city) {
			console.log(city);
			const data = await weatherDataRepo.findOne({ cityName: city });
			if (!data) throw new InternalError("Unable to fetch weather data.");
			weatherData.push(_.omit(data, ["id"]));
		}
	}
	new SuccessResponse("Success", { weatherData }).send(res);
});

export { updateWeatherData, userWeatherData };
