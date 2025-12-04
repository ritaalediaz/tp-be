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
      type: 'mysql', // usa mysql2 automáticamente
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // ⚠️ solo la primera vez para crear tablas, luego pasalo a false
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
