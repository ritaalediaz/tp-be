import { IsString } from "class-validator"

export class CreatePagoDto {
    @IsString()
    metodo_pago:string

    @IsString()
    estado_pago:string

}
