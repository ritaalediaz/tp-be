import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaPersonalizada } from './entities/pizza-personalizada.entity';
import { CreatePizzaPersonalizadaDto } from './dto/create-pizza-personalizada.dto';

@Injectable()
export class PersonalizarPizzasService {
  constructor(
    @InjectRepository(PizzaPersonalizada)
    private readonly repo: Repository<PizzaPersonalizada>,
  ) {}

  async create(dto: CreatePizzaPersonalizadaDto): Promise<PizzaPersonalizada> {
    const nueva = this.repo.create(dto);
    return await this.repo.save(nueva);
  }

  async findAll(): Promise<PizzaPersonalizada[]> {
    return await this.repo.find();
  }
}
