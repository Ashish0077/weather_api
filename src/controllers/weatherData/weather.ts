import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { cities } from "../../utils/constants";
import { apiKey } from "../../config";
import fetch from "node-fetch";
import { IWeatherData } from "../../database/model/WeatherData";
import WeatherDataRepo from "../../database/repository/WeatherDataRepo";
import { SuccessMsgResponse } from "../../core/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { InternalError } from "../../core/ApiError";

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

export { updateWeatherData };
