import { IsNumber } from "class-validator";
import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class EstadoPedido {
    @PrimaryColumn()
    @IsNumber()
    id:number

    @OneToOne(()=>Pedido,(pedido)=>pedido.esPedido)

    @JoinColumn()
    pedido:Pedido
}
