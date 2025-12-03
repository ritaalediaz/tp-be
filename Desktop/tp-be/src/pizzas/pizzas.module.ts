
import { Module } from '@nestjs/common';
import { PizzasService } from './pizzas.service';
import { PizzasController } from './pizzas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pizza } from './entities/pizza.entity';
// 🔧 Import corregido: relativo en vez de 'src/...'
import { Cliente } from '../clientes/entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pizza, Cliente]), // 👈 esto registra los repositorios
  ],
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService],
})
export class PizzasModule {}
