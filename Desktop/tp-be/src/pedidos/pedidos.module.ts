import { forwardRef, Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { ClientesModule } from 'src/clientes/clientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Pago } from 'src/pagos/entities/pago.entity';
import { DetallePedido } from 'src/detalle_pedido/entities/detalle_pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Cliente, Pago, DetallePedido]), // ✅ repositorios
    forwardRef(() => ClientesModule), // ✅ conexión con Clientes
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {}
