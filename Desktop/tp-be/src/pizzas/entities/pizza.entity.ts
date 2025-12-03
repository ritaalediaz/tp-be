import { Cliente } from '../../clientes/entities/cliente.entity';
import { DetallePedido } from '../../detalle_pedido/entities/detalle_pedido.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Pizza {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @Column()
  stock: number;

  @Column()
  imagen: string; // ✅ NUEVO CAMPO

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pizza)
  detallePedidos: DetallePedido[];

  @ManyToOne(() => Cliente, (cliente) => cliente.pizzas)
  cliente: Cliente;
}
