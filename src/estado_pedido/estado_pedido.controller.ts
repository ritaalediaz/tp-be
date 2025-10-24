import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoPedidoService } from './estado_pedido.service';
import { CreateEstadoPedidoDto } from './dto/create-estado_pedido.dto';
import { UpdateEstadoPedidoDto } from './dto/update-estado_pedido.dto';

@Controller('estado-pedido')
export class EstadoPedidoController {
  constructor(private readonly estadoPedidoService: EstadoPedidoService) {}

  @Post()
  create(@Body() createEstadoPedidoDto: CreateEstadoPedidoDto,id:number) {
    return this.estadoPedidoService.create(createEstadoPedidoDto,id);
  }

  @Get()
  findAll() {
    return this.estadoPedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadoPedidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstadoPedidoDto: UpdateEstadoPedidoDto) {
    return this.estadoPedidoService.update(+id, updateEstadoPedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadoPedidoService.remove(+id);
  }
}
