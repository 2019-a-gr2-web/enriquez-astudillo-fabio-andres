import {IsDate, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

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

    @IsOptional()
    @IsDate()
    fechaCaducidad: Date;

    @IsNumber()
    @IsOptional()
    precio: number;

    @IsNumber()
    @IsOptional()
    distribuidorId: number;
}