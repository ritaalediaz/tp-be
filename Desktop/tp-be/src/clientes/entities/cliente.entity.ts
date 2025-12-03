import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Pizza } from '../../pizzas/entities/pizza.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre_usuario: string;

  @Column()
  contraseña: string;

  @Column()
  email: string;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedido: Pedido;

  @OneToMany(() => Pizza, (pizza) => pizza.cliente)
  pizzas: Pizza[];
}
