import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateDetallePedidoDto {
  @IsNotEmpty()
  @IsNumber()
  id_pizza: number;

  @IsNotEmpty()
  @IsNumber()
  id_pedido: number;

  //es para garantizar que el numero siempre sea entero.
  @IsInt()
  @Min(1)
  cantidad: number;
}
