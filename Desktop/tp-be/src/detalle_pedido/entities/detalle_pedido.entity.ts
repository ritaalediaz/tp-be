import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Pizza } from '../../pizzas/entities/pizza.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Pizza, (pizza) => pizza.detallePedidos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  pizza: Pizza;

  @ManyToOne(() => Pedido, (pedido) => pedido.detallePedidos, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  pedido: Pedido;
}
