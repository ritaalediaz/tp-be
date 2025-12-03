import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Pedido } from '../pedidos/entities/pedido.entity';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository: Repository<Pago>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(createPagoDto: CreatePagoDto, id_pedido: number): Promise<Pago> {
    try {
      const nuevoPedido = await this.pedidoRepository.findOne({
        where: { id: id_pedido },
      });
      if (!nuevoPedido) {
        throw new NotFoundException('Pedido no encontrado');
      }

      const nuevoPago = this.pagoRepository.create({
        ...createPagoDto,
        pedido: nuevoPedido,
      });
      return await this.pagoRepository.save(nuevoPago);
    } catch (error) {
      console.error('Error al crear el pago', error);
      throw new InternalServerErrorException('Error al crear pago');
    }
  }

  async findAll(): Promise<Pago[]> {
    return await this.pagoRepository.find();
  }

  async findOne(id: number): Promise<Pago> { // 👈 ahora devuelve solo Pago
    const pago = await this.pagoRepository.findOneBy({ id });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    return pago;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  async remove(id: number) {
    const pago = await this.pagoRepository.findOne({ where: { id } });
    if (!pago) {
      throw new NotFoundException('Pago no encontrado');
    }
    await this.pagoRepository.remove(pago);
  }
}
