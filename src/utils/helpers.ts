import _ from "lodash";
import WeatherData from "../database/model/WeatherData";
import { cities } from "./constants";

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
