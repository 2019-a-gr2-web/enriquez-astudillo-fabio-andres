import {auto} from "./auto";

export interface conductor {
    id: number,
    nombres: string,
    apellidos: string,
    fechaNacimiento: Date,
    licenciaValida: boolean,
    autos: auto[]
}