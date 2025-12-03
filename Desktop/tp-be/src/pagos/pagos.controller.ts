import { Controller, Post, Body, Query, Get, Param, Delete } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Pago } from './entities/pago.entity';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  async create(
    @Body() createPagoDto: CreatePagoDto,
    @Query('id_pedido') id_pedido: number, // 👈 recibe el id del pedido
  ): Promise<Pago> {
    return this.pagosService.create(createPagoDto, id_pedido);
  }

  @Get()
  async findAll(): Promise<Pago[]> {
    return this.pagosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pago> {
    return this.pagosService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.pagosService.remove(id);
  }
}
