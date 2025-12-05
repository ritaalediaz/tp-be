
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

  async create(createPizzaDto: CreatePizzaDto): Promise<Pizza> {
    try {
      const nuevaPizza = this.pizzaRepository.create(createPizzaDto);
      return await this.pizzaRepository.save(nuevaPizza);
    } catch (error) {
      console.error('Error al crear pizza:', error);
      throw new InternalServerErrorException('Error al crear Pizza');
    }
  }

  async findAll(): Promise<Pizza[]> {
    try {
      // Traemos las pizzas con relaciones explícitas
      return await this.pizzaRepository.find({
        relations: ['cliente', 'detallePedidos'],
        select: ['id', 'nombre', 'descripcion', 'precio', 'stock', 'imagen'],
      });
    } catch (error) {
      console.error('Error al obtener pizzas:', error);
      throw new InternalServerErrorException('Error al obtener pizzas');
    }
  }

  async findOne(id: number): Promise<Pizza> {
    try {
      const pizza = await this.pizzaRepository.findOne({
        where: { id },
        relations: ['cliente', 'detallePedidos'],
      });
      if (!pizza) {
        throw new NotFoundException('Pizza no encontrada');
      }
      return pizza;
    } catch (error) {
      console.error(`Error al buscar pizza con id ${id}:`, error);
      throw new InternalServerErrorException('Error al buscar pizza');
    }
  }

  async update(id: number, updatePizzaDto: UpdatePizzaDto): Promise<Pizza> {
    try {
      const pizza = await this.pizzaRepository.findOne({ where: { id } });
      if (!pizza) {
        throw new NotFoundException('Pizza no encontrada');
      }
      Object.assign(pizza, updatePizzaDto);
      return await this.pizzaRepository.save(pizza);
    } catch (error) {
      console.error(`Error al actualizar pizza con id ${id}:`, error);
      throw new InternalServerErrorException('Error al actualizar pizza');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      const pizza = await this.pizzaRepository.findOne({ where: { id } });
      if (!pizza) {
        throw new NotFoundException('Pizza no encontrada.');
      }
      await this.pizzaRepository.remove(pizza);
      return { message: 'Pizza eliminada correctamente' };
    } catch (error) {
      console.error(`Error al eliminar pizza con id ${id}:`, error);
      throw new InternalServerErrorException('Error al eliminar pizza');
    }
  }
}
