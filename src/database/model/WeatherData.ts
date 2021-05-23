import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";

@Entity("weather_data")
export default class WeatherData extends BaseModel {
	@Column({ unique: true })
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

	@Column({
		nullable: true
	})
	windGust: number;

	@Column({ nullable: true })
	rain1h?: number;

	@Column({ nullable: true })
	rain3h?: number;
}

export interface IWeatherData {
	cityName: string;
	currTemp: number;
	minTemp: number;
	maxTemp: number;
	clouds: number;
	windSpeed: number;
	windDeg: number;
	windGust: number;
	rain1h?: number;
	rain3h?: number;
}
