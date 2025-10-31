import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { DetallePedido } from 'src/detalle_pedido/entities/detalle_pedido.entity';


@Injectable()
export class PedidosService {

  constructor(
  @InjectRepository(Pedido)
  private readonly pedidoRepository:Repository<Pedido>,
  @InjectRepository(Cliente)
  private readonly clienteRepository:Repository<Cliente>,
  @InjectRepository(DetallePedido)
  private readonly detallePedidoRepository:Repository<DetallePedido>
  
){}


  // async create(creatPedidoDto:CreatePedidoDto,nombre_usuario:string):Promise<Pedido> {
  //   try{
  //     const nuevoCliente= this.clienteRepository.findOne({where:{nombre_usuario}})//busca cliente 
  //     if(!nuevoCliente){
  //       console.error("No existe el cliente")
  //     }     
  //     const nuevoPedido = this.pedidoRepository.create(creatPedidoDto);
  //     return await this.pedidoRepository.save(nuevoPedido)

  //   } catch(error){
  //     console.error('Error al crear Pedido',error)
  //     throw new InternalServerErrorException('Error al crear Pedido')
  //   }
  // }
  async create(creatPedidoDto: CreatePedidoDto, nombre_usuario: string): Promise<Pedido> {
  try {
    const nuevoCliente = await this.clienteRepository.findOne({ where: { nombre_usuario } }); // 👈 await agregado

    if (!nuevoCliente) {
      console.error("No existe el cliente");
      throw new NotFoundException("Cliente no encontrado"); // 👈 mejor manejo de error
    }

    const nuevoPedido = this.pedidoRepository.create({
      ...creatPedidoDto,
      cliente: nuevoCliente, // 👈 asociación del cliente con el pedido
      detalles: [] 
    });

    return await this.pedidoRepository.save(nuevoPedido);
  } catch (error) {
    console.error('Error al crear Pedido', error);
    throw new InternalServerErrorException('Error al crear Pedido');
  }
}

  async findAll():Promise <Pedido[]> {
    return await this.pedidoRepository.find({
      relations: ['cliente', 'detalles.pizza'],
    });
  }

  async findOne(id: number):Promise <Pedido | null> {
    const pedido= await this.pedidoRepository.findOne({
      where: { id },
      relations: ['cliente', 'detalles', 'detalles.pizza'],
    });
    if(!pedido){
      throw new NotFoundException('Pedido no encontrado')
    }
    return pedido;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  async remove(id: number) {
    const pedido = await this.pedidoRepository.findOne({where:{id}})
    if(!pedido){
      throw new NotFoundException('Pedido no encontrado')
    }
   await this.pedidoRepository.remove(pedido)
  }
}



