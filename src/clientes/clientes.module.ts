import { forwardRef, Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { PedidosModule } from 'src/pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
    forwardRef(() => PedidosModule),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService, TypeOrmModule],
})
export class ClientesModule {}
