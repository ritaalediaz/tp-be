
import { Module } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { DetallePedidoController } from './detalle_pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedido } from './entities/detalle_pedido.entity';
// 🔧 Imports corregidos: relativos en vez de 'src/...'
import { Pedido } from '../pedidos/entities/pedido.entity';
import { Pizza } from '../pizzas/entities/pizza.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetallePedido, Pedido, Pizza]), // 👈 esto registra los repositorios
  ],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
  exports: [DetallePedidoService],
})
export class DetallePedidoModule {}
