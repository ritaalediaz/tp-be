import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateClienteDto } from 'src/clientes/dto/create-cliente.dto';
import { Type } from 'class-transformer';
export class CreatePedidoDto extends CreateClienteDto {
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsNotEmpty()
  @IsString()
  direccion_pedido: string;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsDate()
  @Type(() => Date)
  fecha_pedido: Date;
}
