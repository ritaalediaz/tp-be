
import { forwardRef, Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🔧 Imports corregidos: relativos en vez de 'src/...'
import { Cliente } from '../clientes/entities/cliente.entity';
import { ClientesModule } from '../clientes/clientes.module';
import { Pedido } from './entities/pedido.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { DetallePedido } from '../detalle_pedido/entities/detalle_pedido.entity';

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
