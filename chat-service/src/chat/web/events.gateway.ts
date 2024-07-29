import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from '../domain/model/message';
import { EventType } from '../domain/model/event.type';
import * as console from 'node:console';
import { ChatKafkaProducer } from './chat.kafka.producer';

@WebSocketGateway({
  cors: {
    //todo: fix
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatKafkaProducer: ChatKafkaProducer) {}

  afterInit(server: any): any {
    console.log('websocket gateway initiated');
  }

  @SubscribeMessage(EventType.SUBSCRIBE)
  async subscribe(
    @MessageBody('chatIds') chatIds: string[],
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(chatIds);
  }

  @SubscribeMessage(EventType.MESSAGE)
  async send(@MessageBody('message') message: Message) {
    const { chatId, ...rest } = message;
    await this.server.to(chatId).emit(EventType.MESSAGE, rest);
    await this.chatKafkaProducer.send(message);
  }

  @SubscribeMessage(EventType.UN_SUBSCRIBE)
  async leave(
    @MessageBody('chatId') chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(chatId);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: any): any {
    console.log(`client disconnected: ${client.id}`);
  }
}
