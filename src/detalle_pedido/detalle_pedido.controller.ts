import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { CreateDetallePedidoDto } from './dto/create-detalle_pedido.dto';
import { UpdateDetallePedidoDto } from './dto/update-detalle_pedido.dto';
import { Pizza } from 'src/pizzas/entities/pizza.entity';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private readonly detallePedidoService: DetallePedidoService) {}

  @Post()
  create(@Body() createDetallePedidoDto: CreateDetallePedidoDto, @Body('pizza') pizza: Pizza) {
    return this.detallePedidoService.create(createDetallePedidoDto, pizza);
  }

  @Get()
  findAll() {
    return this.detallePedidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallePedidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallePedidoDto: UpdateDetallePedidoDto) {
    return this.detallePedidoService.update(+id, updateDetallePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallePedidoService.remove(+id);
  }
}


// import { Body, Controller, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
// import { DetallePedidoService } from './detalle-pedido.service';
// import { CreateDetallePedidoDto } from './dto/create-detalle-pedido.dto';

// @Controller('detalles')
// export class DetallePedidoController {
//   constructor(private readonly detalleService: DetallePedidoService) {}

//   // Crear un detalle de pedido
//   @Post()
//   async create(@Body() dto: CreateDetallePedidoDto) {
//     return this.detalleService.create(dto);
//   }

//   // Obtener un pedido con todos sus detalles y pizzas
//   @Get('pedido/:id')
//   async getPedidoDetalle(@Param('id', ParseIntPipe) id: number) {
//     return this.detalleService.getPedidoConDetalles(id);
//   }
// }
