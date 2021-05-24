import { Column, Entity, OneToOne } from "typeorm";
import { cities } from "../../utils/constants";
import BaseModel from "./BaseModel";

@Entity("user_preferences")
export default class UserPreferences extends BaseModel {
	@Column({ nullable: false })
	city1: string;

	@Column({ nullable: true })
	city2: string;

	@Column({ nullable: true })
	city3: string;
}
