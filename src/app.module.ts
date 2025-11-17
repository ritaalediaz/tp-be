import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagosModule } from './pagos/pagos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clientes/entities/cliente.entity';
import { Pedido } from './pedidos/entities/pedido.entity';
import { ClientesModule } from './clientes/clientes.module';
import { EstadoPedidoModule } from './estado_pedido/estado_pedido.module';
import { DetallePedidoModule } from './detalle_pedido/detalle_pedido.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { PersonalizarPizzasModule } from './personalizar-pizzas/personalizar-pizzas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // o postgres, sqlite, etc.
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Erasmo00',
      database: 'pizzaconmigo',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PedidosModule,
    PagosModule,
    ClientesModule,
    EstadoPedidoModule,
    EstadoPedidoModule,
    DetallePedidoModule,
    PizzasModule,
    PersonalizarPizzasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
