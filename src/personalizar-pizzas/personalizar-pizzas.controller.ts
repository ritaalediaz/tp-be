import { Controller, Post, Get, Body } from '@nestjs/common';
import { PersonalizarPizzasService } from './personalizar-pizzas.service';
import { CreatePizzaPersonalizadaDto } from './dto/create-pizza-personalizada.dto';

@Controller('personalizar-pizzas')
export class PersonalizarPizzasController {
  constructor(private readonly service: PersonalizarPizzasService) {}

  @Post()
  create(@Body() dto: CreatePizzaPersonalizadaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
