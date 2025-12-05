import { IsString, IsNumber, IsArray, ArrayMinSize } from 'class-validator';

export class CreatePizzaPersonalizadaDto {
  @IsString()
  nombre: string;

  @IsString()
  masa: string;

  @IsString()
  salsa: string;

  @IsArray()
  @ArrayMinSize(1)
  ingredientes: string[];

  @IsNumber()
  precio: number;
}
