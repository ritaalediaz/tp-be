import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PizzaPersonalizada } from './entities/pizza-personalizada.entity';
import { PersonalizarPizzasService } from './personalizar-pizzas.service';
import { PersonalizarPizzasController } from './personalizar-pizzas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PizzaPersonalizada])],
  controllers: [PersonalizarPizzasController],
  providers: [PersonalizarPizzasService],
})
export class PersonalizarPizzasModule {}
