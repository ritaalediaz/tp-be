import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsOptional, IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateClienteDto {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    contraseña: string;

    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    email: string;

}
