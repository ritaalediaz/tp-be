import { Cliente } from "src/clientes/entities/cliente.entity";
import { DetallePedido } from "src/detalle_pedido/entities/detalle_pedido.entity";
import { EstadoPedido } from "src/estado_pedido/entities/estado_pedido.entity";
import { Pago } from "src/pagos/entities/pago.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,OneToOne, OneToMany } from "typeorm";


@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id:number

    //preguntar si aca va la FK de Cliente
    @Column()
    monto:number;
    
    @Column()
    direccion_envio:string;
    
    @Column()
    cantidad:number;
    
    @Column('timestamp')
    fecha:Date

    @ManyToOne(()=> Cliente,(cliente)=>cliente.pedido)
   
    @JoinColumn()
    cliente:Cliente;

    @OneToOne(()=>Pago,(pago)=>pago.pedido)

    @JoinColumn()
    pago:Pago;

    @OneToOne(()=>EstadoPedido, (esPedido)=> esPedido.pedido)
    @JoinColumn()
    esPedido:EstadoPedido;

    @OneToMany(()=>DetallePedido,(detallePedido)=>detallePedido.pedido)
    detalles: DetallePedido[];
    detallePedidos: any;

    //trabajar el pedido personalizado.
    // pedido.entity.ts
// @Entity()
// export class Pedido {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Pizza)
//   pizzaBase: Pizza; // por ejemplo, “Muzzarella”

//   @Column('simple-array')
//   ingredientesExtra: string[]; // ["bacon", "rúcula"]

//   @Column({ default: 0 })
//   precioTotal: number;
// }


}
