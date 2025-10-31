import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class CreateEstadoPedidoDto {
    
    @PrimaryGeneratedColumn()
    id_estado_pedido: number;


}
