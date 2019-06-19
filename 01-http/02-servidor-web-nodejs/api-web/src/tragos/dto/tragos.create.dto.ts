import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsString, IsOptional} from "class-validator";

export class TragosCreateDto {

    @IsEmpty()
    id:number;

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    tipo: string;

    @IsNotEmpty()
    @IsNumber()
    gradosAlcohol: number;

    @IsDate()
    @IsOptional()
    fechaCaducidad: Date;

    @IsNumber()
    precio: number;

    @IsNumber()
    distribuidorId: number;
}