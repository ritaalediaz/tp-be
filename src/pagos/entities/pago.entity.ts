import { Pedido } from 'src/pedidos/entities/pedido.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metodo_pago: string;

  @Column()
  estado_pago: string;

  @OneToOne(() => Pedido, (pedido) => pedido.pago)
  @JoinColumn()
  pedido: Pedido;
}
