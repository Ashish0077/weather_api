import {
	Column,
	CreateDateColumn,
	Generated,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";

/*
	It contains the common attributes of all the models/entities.
	All the Models/Entities will inherit from this base class.
*/
export default abstract class BaseModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Generated("uuid")
	uuid: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(model: Partial<any>) {
		Object.assign(this, model);
	}
}
