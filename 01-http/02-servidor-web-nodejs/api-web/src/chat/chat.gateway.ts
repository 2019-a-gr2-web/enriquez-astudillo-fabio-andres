import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets'
import { Client } from 'socket.io';

@WebSocketGateway(3001,{
    namespace:'/websockets'
})
export class ChatGateway{
    @WebSocketServer() server;
    constructor(){
        console.log(this.server)
    }

    @SubscribeMessage('holaMundo')
    holaMundo(client: Client, data: any){
        console.log(data);
        console.log('Nos hacen la peticion');
        return 'Hola mundo';
    }
}