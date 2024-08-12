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
import { EventType, PropertyKey } from '../domain/model/event.type';
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

  private readonly LIST_PREFIX = 'list_';

  constructor(private readonly chatKafkaProducer: ChatKafkaProducer) {}

  afterInit(server: any): any {
    console.log('websocket gateway initiated');
  }

  @SubscribeMessage(EventType.SUBSCRIBE)
  async subscribe(
    @MessageBody(PropertyKey.CHAT_IDS) chatIds: string[],
    @ConnectedSocket() client: Socket,
  ) {
    for (let i = 0; i < chatIds.length; i++) {
      const chat = chatIds[i];
      await client.join(chat);
    }
    // await client.join(chatIds);
  }

  @SubscribeMessage(EventType.MESSAGE)
  async send(@MessageBody(PropertyKey.MESSAGE) messageBody: Message) {
    const { chatId, ...rest } = messageBody;
    await this.server.to(chatId).emit(EventType.MESSAGE, messageBody);
    await this.server
      .to(this.LIST_PREFIX + chatId)
      .emit(EventType.MESSAGE, { ...rest, chatId: this.LIST_PREFIX + chatId });
    await this.chatKafkaProducer.send(messageBody);
  }

  @SubscribeMessage(EventType.UN_SUBSCRIBE)
  async leave(
    @MessageBody(PropertyKey.CHAT_ID) chatId: string,
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
