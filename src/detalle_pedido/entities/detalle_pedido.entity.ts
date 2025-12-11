import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { PizzaPersonalizada } from 'src/personalizar-pizzas/entities/pizza-personalizada.entity';
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

  // 🍕 Pizzas tradicionales
  @ManyToOne(() => Pizza, (pizza) => pizza.detallePedidos, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'pizzaId' })
  pizza: Pizza;

  // 📦 Pedido
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Pedido, (pedido) => pedido.detallePedidos, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'pedidoId' })
  pedido: Pedido;

  // 🛠️ Pizzas personalizadas
  @ManyToOne(() => PizzaPersonalizada, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'pizzaPersonalizadaId' })
  pizzaPersonalizada: PizzaPersonalizada;
}
