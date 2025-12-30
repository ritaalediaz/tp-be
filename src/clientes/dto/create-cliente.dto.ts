/* eslint-disable prettier/prettier */
 import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  rol: string; // 'cliente' o 'admin'
}