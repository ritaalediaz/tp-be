import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosModule } from './pedidos/pedidos.module';
import { PagosModule } from './pagos/pagos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { EstadoPedidoModule } from './estado_pedido/estado_pedido.module';
import { DetallePedidoModule } from './detalle_pedido/detalle_pedido.module';
import { PizzasModule } from './pizzas/pizzas.module';
import { PersonalizarPizzasModule } from './personalizar-pizzas/personalizar-pizzas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT ?? '3306'),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ solo la primera vez para que cree tablas, luego pasalo a false
    }),
    PedidosModule,
    PagosModule,
    ClientesModule,
    EstadoPedidoModule,
    DetallePedidoModule,
    PizzasModule,
    PersonalizarPizzasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
