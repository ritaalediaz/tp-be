import { forwardRef, Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { ClientesModule } from 'src/clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Pago } from 'src/pagos/entities/pago.entity';
import { DetallePedido } from 'src/detalle_pedido/entities/detalle_pedido.entity';
//las tengo que registrar. traer entidad a module.
@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Cliente, Pago, DetallePedido]), // 👈 esto registra los repositorios
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {}
