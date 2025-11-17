import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString({ message: 'Por favor ingrese un nombre válido' })
  nombre_usuario: string;

  @IsNotEmpty()
  @IsString()
  contraseña: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
