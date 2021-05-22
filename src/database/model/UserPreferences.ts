import { Column, Entity, OneToOne } from "typeorm";
import BaseModel from "./BaseModel";

@Entity("user_preferences")
export default class UserPreferences extends BaseModel {
	@Column({
		unique: true,
		nullable: true
	})
	city1: string;

	@Column({
		unique: true,
		nullable: true
	})
	city2: string;

	@Column({
		unique: true,
		nullable: true
	})
	city3: string;
}
