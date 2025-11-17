import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pizza, Cliente]), // 👈 esto registra los repositorios
  ],
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService],
})
export class PizzasModule {}
