import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
} from '@nestjs/websockets';
import {Client} from 'socket.io';

// ws://localhost:3001/websockets
@WebSocketGateway(3001,{
    namespace:'/websockets'
})

export class ChatGateway {
    @WebSocketServer() server;
    constructor(){
        console.log(this.server);
    }

    @SubscribeMessage('juego')
    juego(client: Client | any, data: any){
        //console.log(data)
        const nombre:String = data.nombre.toUpperCase()
        client.broadcast.emit('respuesta',data)
        if(nombre.includes('A')){
            client.emit('respuesta',{nombre: 'Te equivocaste, toma!!!'}); 
            client.broadcast.emit('respuesta',{nombre: 'Te equivocaste, toma!!!'}); 
        } else {
            client.emit('respuesta',{nombre: 'Correcto, pasa al siguiente'}); 
            client.broadcast.emit('respuesta',{nombre: 'Te equivocaste, toma!!!'}); 
        }
        return 'Hola '+ data.nombre;
    }
}