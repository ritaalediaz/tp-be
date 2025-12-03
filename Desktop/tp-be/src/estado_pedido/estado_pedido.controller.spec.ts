import { Test, TestingModule } from '@nestjs/testing';
import { EstadoPedidoController } from './estado_pedido.controller';
import { EstadoPedidoService } from './estado_pedido.service';

describe('EstadoPedidoController', () => {
  let controller: EstadoPedidoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoPedidoController],
      providers: [EstadoPedidoService],
    }).compile();

    controller = module.get<EstadoPedidoController>(EstadoPedidoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
