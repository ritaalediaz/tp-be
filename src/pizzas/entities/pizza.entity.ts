import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pizza {
@PrimaryGeneratedColumn()
id:number;

@Column()
nombre:string;

@Column()
descripcion:string

@Column()
precio:number

@Column()
stock:number

}
