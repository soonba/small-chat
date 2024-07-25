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
import { Chat } from '../domain/model/chat';
import { EventType } from '../domain/model/event.type';
import * as console from 'node:console';
import { ChatKafkaProducer } from './chat.kafka.producer';

@WebSocketGateway({
  cors: {
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
    @MessageBody('roomIds') roomIds: string[],
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(roomIds);
  }

  @SubscribeMessage(EventType.CHAT)
  async send(@MessageBody('chat') chat: Chat) {
    const { roomId, ...rest } = chat;
    await this.server.to(roomId).emit(EventType.CHAT, rest);
    await this.chatKafkaProducer.send(chat);
  }

  @SubscribeMessage(EventType.UN_SUBSCRIBE)
  async leave(
    @MessageBody('roomId') roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.leave(roomId);
  }

  handleConnection(client: any, ...args: any[]): any {
    console.log(`client connected: ${client.id}`);
  }

  handleDisconnect(client: any): any {
    console.log(`client disconnected: ${client.id}`);
  }
}
