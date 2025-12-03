import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePizzaDto } from './dto/create-pizza.dto';
import { UpdatePizzaDto } from './dto/update-pizza.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PizzasService {
  constructor(
    @InjectRepository(Pizza)
    private readonly pizzaRepository: Repository<Pizza>,
  ) {}

  async create(creatPizzaDto: CreatePizzaDto): Promise<Pizza> {
    try {
      const nuevaPizza = this.pizzaRepository.create(creatPizzaDto);
      return await this.pizzaRepository.save(nuevaPizza);
    } catch (error) {
      console.error('Error al crear pizza', error);
      throw new InternalServerErrorException('Error al crear Pizza');
    }
  }

  async findAll(): Promise<Pizza[]> {
    return await this.pizzaRepository.find();
  }

  async findOne(id: number): Promise<Pizza> {
    const pizza = await this.pizzaRepository.findOneBy({ id });
    if (!pizza) {
      throw new NotFoundException('Pizza no encontrada');
    }
    return pizza;
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    const pizza = await this.pizzaRepository.findOne({ where: { id } });
    if (!pizza) {
      throw new NotFoundException('Pizza no encontrada');
    }
    Object.assign(pizza, updatePizzaDto);
    return await this.pizzaRepository.save(pizza);
  }

  async remove(id: number): Promise<{ message: string }> {
    const pizza = await this.pizzaRepository.findOne({ where: { id } });
    if (!pizza) {
      throw new NotFoundException('Pizza no encontrada.');
    }
    await this.pizzaRepository.remove(pizza);
    return { message: 'Pizza eliminada correctamente' };
  }
}
