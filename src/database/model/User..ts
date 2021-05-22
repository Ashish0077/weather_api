import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseModel from "./BaseModel";
import UserPreferences from "./UserPreferences";

@Entity("users")
class User extends BaseModel {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToOne(() => UserPreferences)
	@JoinColumn()
	userPreferences: UserPreferences;
}

export default User;
