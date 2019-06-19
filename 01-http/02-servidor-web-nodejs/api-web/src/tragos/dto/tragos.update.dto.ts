import { DistribuidorEntity } from "src/distribuidor/distribuidor.entity";

export class TragosCreateDto {
    id:number;
    nombre:string;
    tipo: 'Ron'|'Vodka'|'Wisky'|'Tequila'|'Puntas'|'Cerveza';
    gradosAlcohol:number;
    precio:number;
    distribuidorId: DistribuidorEntity;
    fechaCaducidad: Date;

}