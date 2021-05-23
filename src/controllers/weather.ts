import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { cities } from "../utils/constants";
import { apiKey } from "../config";
import fetch from "node-fetch";
import { IWeatherData } from "../database/model/WeatherData";
import WeatherDataRepo from "../database/repository/WeatherDataRepo";

const updateWeatherData = async (req: Request, res: Response, next: NextFunction) => {
	const getWeatherData = async (city: string): Promise<IWeatherData> => {
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
		const data = await (await fetch(url)).json();
		const res: IWeatherData = {
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
		return res;
	};
	const weatherRepo = getCustomRepository(WeatherDataRepo);
	for (const city of cities) {
		await weatherRepo.insertOrUpdate(await getWeatherData(city));
	}
	res.json("updated");
};

export { updateWeatherData };
