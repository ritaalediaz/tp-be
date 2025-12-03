import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PizzaPersonalizada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  masa: string;

  @Column()
  salsa: string;

  @Column('simple-array')
  ingredientes: string[];

  @Column()
  precio: number;
}
