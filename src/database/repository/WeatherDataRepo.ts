import { EntityRepository, Repository } from "typeorm";
import WeatherData, { IWeatherData } from "../model/WeatherData";

@EntityRepository(WeatherData)
export default class WeatherDataRepo extends Repository<WeatherData> {
	async insertOrUpdate(weatherData: IWeatherData): Promise<void> {
		const wd = await this.findOne({ cityName: weatherData.cityName });
		if (wd) await this.update({ cityName: weatherData.cityName }, weatherData);
		else await this.insert(weatherData);
	}
}
