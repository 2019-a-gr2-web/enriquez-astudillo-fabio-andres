import {auto} from "./auto";

export interface conductor {
    nombres:string,
    apellidos:string,
    fechaNacimiento:Date,
    licenciaValida:boolean,
    autos: auto[]
}