import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Injectable()

export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagoRepository:Repository<Pago>,
    @InjectRepository(Pedido)
    private readonly pedidoRepository:Repository<Pedido>
  ){}

  async create(createPagoDto: CreatePagoDto, fecha:Date):Promise<Pago> {
    try{
      const nuevoPedido = await this.pedidoRepository.findOne({ where: { fecha } });//aca pongo el id de Pedido
      if(!nuevoPedido){
        console.error("no existe el pedido");
        throw new NotFoundException("Pedido no encontrado") //Manejo de error
      }
      
      const nuevoPago = this.pagoRepository.create({
        ...createPagoDto,
        pedido: nuevoPedido, //asociacion del pago con el pedido
      })
      return await this.pagoRepository.save(nuevoPago)
    } catch (error){
      console.error('Error al crear el pedido', error)
      throw new InternalServerErrorException('Error al crear pago')
    }
  
  }

   async findAll():Promise <Pago[]> {
    return await this.pagoRepository.find();
  }

  async findOne(id: number):Promise <Pago | null> {
    const pago = await this.pagoRepository.findOneBy({id})
    if(!pago){
      throw new NotFoundException('Pago no encontrado')
    }
    return pago;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  async remove(id: number) {
    const pago = await this.pagoRepository.findOne ({where:{id}})
    if(!pago){
      throw new NotFoundException('Pago no encontrado')
    }
    await this.pagoRepository.remove(pago);
  }
}
