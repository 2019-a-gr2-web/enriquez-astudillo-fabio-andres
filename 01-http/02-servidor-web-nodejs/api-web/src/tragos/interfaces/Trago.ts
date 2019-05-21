export interface Trago {
    id?:number,
    nombre: string,
    tipo:'Ron'|'Vodka'|'Wisky'|'Tequila'|'Puntas'|'Cerveza',
    gradosAlcohol:number,
    fechaCaducidad:Date,
    precio:number
}