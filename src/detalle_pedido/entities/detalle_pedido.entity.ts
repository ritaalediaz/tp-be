import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class DetallePedido {
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
  @JoinColumn()
  cantidad: number;
  @PrimaryGeneratedColumn()
  id: number;
}
