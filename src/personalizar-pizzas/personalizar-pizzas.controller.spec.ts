import { Test, TestingModule } from '@nestjs/testing';
import { PersonalizarPizzasController } from './personalizar-pizzas.controller';

describe('PersonalizarPizzasController', () => {
  let controller: PersonalizarPizzasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalizarPizzasController],
    }).compile();

    controller = module.get<PersonalizarPizzasController>(
      PersonalizarPizzasController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
