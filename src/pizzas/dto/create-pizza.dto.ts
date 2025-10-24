import { IsString } from "class-validator";

export class CreatePizzaDto {
    @IsString()
    nombre_pizza:string;


    @IsString()
    descripcion:string;
}
