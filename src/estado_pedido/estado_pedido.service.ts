import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEstadoPedidoDto } from './dto/create-estado_pedido.dto';
import { UpdateEstadoPedidoDto } from './dto/update-estado_pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';
import { Repository } from 'typeorm';
import { EstadoPedido } from './entities/estado_pedido.entity';

@Injectable()
export class EstadoPedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(EstadoPedido)
    private readonly estPedidoRepository: Repository<EstadoPedido>,
  ) {}

  async create(
    createEstadoPedidoDto: CreateEstadoPedidoDto,
    id: number,
  ): Promise<EstadoPedido> {
    try {
      const newPedido = await this.pedidoRepository.findOne({ where: { id } });
      if (!newPedido) {
        console.error('no existe el pedido');
        throw new NotFoundException('Pedido no encontrado'); //manejo de error
      }

      const newEstPedido = this.estPedidoRepository.create({
        ...createEstadoPedidoDto,
        pedido: newPedido,
      });
      return await this.estPedidoRepository.save(newEstPedido);
    } catch (error) {
      console.error('error al crear estado de pedido', error);
      throw new InternalServerErrorException('error al crear estado pedido');
    }
  }

  async findAll(): Promise<EstadoPedido[]> {
    return await this.estPedidoRepository.find();
  }

  async findOne(id: number): Promise<EstadoPedido | null> {
    const estadoPedido = await this.estPedidoRepository.findOneBy({ id });
    if (!estadoPedido) {
      throw new NotFoundException('Estado pedido no encontrado');
    }
    return estadoPedido;
  }

  update(id: number, updateEstadoPedidoDto: UpdateEstadoPedidoDto) {
    return `This action updates a #${id} estadoPedido`;
  }

  async remove(id: number) {
    const estadoPedido = await this.estPedidoRepository.findOne({
      where: { id },
    });
    if (!estadoPedido) {
      throw new NotFoundException('Estado de pedido no encontrado');
    }
    await this.estPedidoRepository.remove(estadoPedido);
  }
}
