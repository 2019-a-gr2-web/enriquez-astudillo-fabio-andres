import {Injectable} from "@nestjs/common";
import {Trago} from "./interfaces/trago";
import {InjectRepository} from "@nestjs/typeorm";
import {TragosEntity} from "./tragos.entity";
import {Repository} from "typeorm";

@Injectable()
export class TragosService {

    bddTragos: Trago[] = [];
    recnum = 1;

    constructor(@InjectRepository(TragosEntity)
                private readonly _tragosRepository: Repository<TragosEntity>,){

        const traguito:Trago = {
            nombre:'Pilsener',
            gradosAlcohol:4.3,
            fechaCaducidad: new Date(2019,5,10),
            precio:1.75,
            tipo:'Cerveza'
        };

        // console.log('LINEA 1');
        //this._tragosRepository
        //     .save(objetoEntidad) // Promesa
        //     .then(
        //         (datos)=>{
        //             console.log('LINEA 2');
        //             // console.log('Dato creado:', datos);
        //         }
        //     )
        //     .catch(
        //         (error)=>{
        //             console.log('LINEA 3');
        //             // console.error('Error:', error);
        //         }
        //     );
        // console.log('LINEA 4');







        this.crear(traguito);

    }

    buscar(parametrosBusqueda?):Promise<TragosEntity[]>{
        return this._tragosRepository.find(parametrosBusqueda);
    }

    crear(nuevoTrago: Trago):Promise<Trago> {
        // nuevoTrago.id = this.recnum;
        // this.recnum++;
        // this.bddTragos.push(nuevoTrago);
        // return nuevoTrago;

        const objetoEntidad = this._tragosRepository
                                    .create(nuevoTrago);

        return this._tragosRepository.save(objetoEntidad);
    }


    eliminar(parametros){
        this._tragosRepository.delete(parametros)
    }

    actualizar(nuevoTrago: Trago, parametros){
        this._tragosRepository.update(parametros,nuevoTrago)
    }

    // buscarPorId(id: number):Trago {
    //     return this.bddTragos.find(
    //         (trago) => {
    //             return trago.id === id;
    //         }
    //     );
    // }

    // buscarPorNombre(nombre: string):Trago {
    //     return this.bddTragos.find(
    //         (trago) => {
    //             return trago.nombre.toUpperCase().includes(nombre.toUpperCase());
    //         }
    //     );
    // }

    // eliminarPorId(id: number):Trago[] {
    //     const indice = this.bddTragos.findIndex(
    //         (trago) => {
    //             return trago.id === id
    //         }
    //     );
    //     this.bddTragos.splice(indice,1);
    //     return this.bddTragos;
    // }

    // actualizar(tragoActualizado: Trago, id:number):Trago[] {

    //     const indice = this.bddTragos.findIndex(
    //         (trago) => {
    //             return trago.id === id
    //         }
    //     );
    //     tragoActualizado.id = this.bddTragos[indice].id;
    //     this.bddTragos[indice] = tragoActualizado;

    //     return this.bddTragos;
    // }

}