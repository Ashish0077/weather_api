import _ from "lodash";
import WeatherData, { IWeatherData } from "../database/model/WeatherData";
import { cities } from "./constants";
import fetch from "node-fetch";
import { InternalError } from "../core/ApiError";
import { apiKey } from "../config";

// Helper function for checking if the user provided city name is valid or not
export const isCityValid = (userCity: string): boolean => {
	for (const city of cities) {
		if (city == userCity) return true;
	}
	return false;
};

export const duplicateCity = (city1: string, city2: string, city3: string): boolean => {
	if (city1 == city2 || city1 == city3 || (city2 && city3 && city2 == city3)) return true;
	return false;
};

const kelvinToCelcius = (temp: number): number => _.round(temp - 273.15, 2);
const kelvinToFahrenheit = (temp: number): number => _.round((temp - 273.15) * 1.8 + 32, 2);

export const convertTempUnit = (weatherData: WeatherData, unit: string): WeatherData => {
	if (unit == "celcius") {
		weatherData.currTemp = kelvinToCelcius(weatherData.currTemp);
		weatherData.minTemp = kelvinToCelcius(weatherData.minTemp);
		weatherData.maxTemp = kelvinToCelcius(weatherData.maxTemp);
	} else if (unit == "fahrenheit") {
		weatherData.currTemp = kelvinToFahrenheit(weatherData.currTemp);
		weatherData.minTemp = kelvinToFahrenheit(weatherData.minTemp);
		weatherData.maxTemp = kelvinToFahrenheit(weatherData.maxTemp);
	}
	return weatherData;
};

export const fetchWeatherData = async (city: string): Promise<IWeatherData> => {
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}`;
	const response = await fetch(url);
	if (!response.ok) throw new InternalError("Unable to update weather data.");
	const data = await response.json();
	const weatherData: IWeatherData = {
		cityName: city,
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
	return weatherData;
};
