import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  clienteId: number;

  @IsNotEmpty()
  @IsString()
  formaEnvio: string;

  @IsNotEmpty()
  @IsString()
  medioPago: string;

  @IsNotEmpty()
  @IsString()
  direccionEnvio: string;

  @IsNotEmpty()
  @IsDateString()
  fecha: Date;
}