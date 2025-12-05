import { Cliente } from '../../clientes/entities/cliente.entity';
import { DetallePedido } from '../../detalle_pedido/entities/detalle_pedido.entity';
import { EstadoPedido } from '../../estado_pedido/entities/estado_pedido.entity';
import { Pago } from '../../pagos/entities/pago.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  direccionEnvio: string;   // 👈 corregido

  @Column()
  cantidad: number;

  @Column('timestamp')
  fecha: Date;              // 👈 corregido

  @ManyToOne(() => Cliente, (cliente) => cliente.pedido)
  @JoinColumn()
  cliente: Cliente;

  @OneToOne(() => Pago, (pago) => pago.pedido)
  @JoinColumn()
  pago: Pago;

  @OneToOne(() => EstadoPedido, (esPedido) => esPedido.pedido)
  @JoinColumn()
  esPedido: EstadoPedido;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
  detalles: DetallePedido[];

  detallePedidos: any;
}