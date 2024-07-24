import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  //구독하고 발송하고 카프카에 메시지 보내고.
  // @SubscribeMessage('joinRoom')
  // async handleJoinRoom(client: Socket, room: string): Promise<void> {
  //   client.join(room);
  //   await this.subClient.subscribe(room);
  // }
  //
  // @SubscribeMessage('msgToServer')
  // async handleMessage(
  //   client: Socket,
  //   payload: { room: string; message: string },
  // ): Promise<void> {
  //   const { room, message } = payload;
  //   await this.pubClient.publish(room, message);
  // }
}
