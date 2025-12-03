import { Module } from '@nestjs/common';
import { EstadoPedidoService } from './estado_pedido.service';
import { EstadoPedidoController } from './estado_pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// 🔧 Import corregido: relativo en vez de 'src/...'
import { Pedido } from '../pedidos/entities/pedido.entity';
import { EstadoPedido } from './entities/estado_pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, EstadoPedido])],
  controllers: [EstadoPedidoController],
  providers: [EstadoPedidoService],
})
export class EstadoPedidoModule {}
