import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDetallePedidoDto } from './dto/create-detalle_pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle_pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Repository } from 'typeorm';
import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { NotFoundError } from 'rxjs';
import { DetallePedido } from './entities/detalle_pedido.entity';

@Injectable()
export class DetallePedidoService {

  constructor(
    @InjectRepository(DetallePedido)
    private readonly detallePedidoRepository:Repository<DetallePedido>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository:Repository<Pedido>,
      @InjectRepository(Pizza)
      private readonly pizzaRepository:Repository<Pizza>
  ){}

  async create(createDetallePedidoDto: CreateDetallePedidoDto, pizza:Pizza):Promise <DetallePedido>{
    try{
      const pedidos = await this.pedidoRepository.findOneBy({ id:createDetallePedidoDto.id_pedido});

      if(!pedidos){
        console.error("No existe el pedido");
        throw new NotFoundException("Pedido no encontrado")
      };
      const pizza = await this.pizzaRepository.findOneBy({id:createDetallePedidoDto.id_pizza});
      if(!pizza){
        console.error("No existe la pizza");
        throw new NotFoundException("Pizza no encontrada")
      }
      const detallePedido = this.detallePedidoRepository.create({
        pedido:pedidos,
        pizza:pizza,
        cantidad:createDetallePedidoDto.cantidad || 1
        
      });
       return this.detallePedidoRepository.save(detallePedido)
    
    } catch{
      console.error("Error")
      throw new InternalServerErrorException("Error al crear el detalle ")
    }

   




  }

  async findAll():Promise <DetallePedido[]> {
    return await this.detallePedidoRepository.find({
      relations: ['pedido', 'pizza'],
    });
  }

  async findOne(id: number) {
    const detalle = await this.detallePedidoRepository.findOne({
      where: { id },
      relations: ['pedido', 'pizza'],
    });
    if (!detalle) throw new NotFoundException('Detalle no encontrado');

    return detalle;
  }

  update(id: number, updateDetallePedidoDto: UpdateDetallePedidoDto) {
    return `This action updates a #${id} detallePedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallePedido`;
  }
}


