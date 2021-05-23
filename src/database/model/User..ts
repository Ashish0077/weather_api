import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseModel from "./BaseModel";
import UserPreferences from "./UserPreferences";

@Entity("users")
class User extends BaseModel {
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@OneToOne(() => UserPreferences, { eager: true })
	@JoinColumn({ name: "preference_id" })
	userPreferences: UserPreferences;
}

export default User;
