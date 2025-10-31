import { Pedido } from "src/pedidos/entities/pedido.entity";
import { Pizza } from "src/pizzas/entities/pizza.entity";
import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"
import { OneToMany } from "typeorm";
@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre_usuario:string;
    
    @Column ()
    contraseña:string
    
    @Column()
    email: string;

    @OneToMany(()=> Pedido,(pedido)=>pedido.cliente)
    pedido:Pedido;

    @OneToMany(()=> Pizza,(pizza)=>pizza.cliente)
    pizzas:Pizza[];
}
