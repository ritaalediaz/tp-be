import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {

    constructor (
      @InjectRepository(Cliente)
      private readonly clienteRepository:Repository<Cliente>,
    ){}
      async create(creatClienteDto:CreateClienteDto):Promise<Cliente>{
        try {
            const nuevoCliente = this.clienteRepository.create(creatClienteDto);
        return await this.clienteRepository.save(nuevoCliente);
        } catch (error) {
          console.error('error al crear cliente', error)
          throw new InternalServerErrorException('Error al crear cliente')
          
        }
        
      }
    
    
  async findAll():Promise <Cliente[]> {
    return await this.clienteRepository.find();
  }

  async findOne(id:number):Promise <Cliente | null> {
    const cliente = await this.clienteRepository.findOneBy({id})
    if(!cliente){
      throw new NotFoundException('cliente no encontrado')
    }

    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto){ 
    const cliente =  await this.clienteRepository.findOne({where :{id}})
    if(!cliente){
      throw new NotFoundException('cliente no encontrado')
    }
    Object.assign(cliente,updateClienteDto)
    return await this.clienteRepository.save(cliente)

  }

  async remove(id: number) {
    const cliente = await this.clienteRepository.findOne({where:{id}})
    if(!cliente){
      throw new NotFoundException('cliente no encontrado')
    }
    await this.clienteRepository.remove(cliente)
  }
}

//preguntar si se borra fisica o logicamente