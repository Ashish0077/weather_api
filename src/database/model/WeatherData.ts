import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";

@Entity("weather_data")
export default class WeatherData extends BaseModel {
	@Column()
	cityName: string;

	@Column()
	currTemp: number;

	@Column()
	minTemp: number;

	@Column()
	maxTemp: number;

	@Column()
	clouds: number;

	@Column()
	windSpeed: number;

	@Column()
	windDeg: number;

	@Column()
	windGust: number;

	@Column()
	rain1h?: number;

	@Column()
	rain3h?: number;
}
