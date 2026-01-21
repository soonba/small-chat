import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventType, PropertyKey } from '../domain/model/event.type';
import { MessageEventType } from '../domain/model/message';
import { ChatRabbitMQProducer } from './chat.rmq.producer';
import { getCorsOrigins } from '../../config/cors';

@WebSocketGateway({ cors: { origin: getCorsOrigins() } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly LIST_PREFIX = 'list_';

  constructor(private readonly rmqProducer: ChatRabbitMQProducer) {}

  @SubscribeMessage(EventType.SUBSCRIBE)
  async subscribe(
    @MessageBody(PropertyKey.CHAT_IDS) chatIds: string[],
    @ConnectedSocket() client: Socket,
  ) {
    if (!Array.isArray(chatIds)) {
      return;
    }
    for (let i = 0; i < chatIds.length; i++) {
      const chat = chatIds[i];
      await client.join(chat);
    }
    // await client.join(chatIds);
  }

  @SubscribeMessage(EventType.MESSAGE)
  async send(@MessageBody(PropertyKey.MESSAGE) messageBody: MessageEventType) {
    await this.broadcastAndPublish(messageBody);
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

  async broadcast(messageBody: MessageEventType) {
    this.emitMessage(messageBody);
  }

  async broadcastAndPublish(messageBody: MessageEventType) {
    this.emitMessage(messageBody);
    await this.rmqProducer.send(messageBody);
  }

  private emitMessage(messageBody: MessageEventType) {
    const { chatId, ...rest } = messageBody;
    this.server.to(chatId).emit(EventType.MESSAGE, messageBody);
    this.server
      .to(this.LIST_PREFIX + chatId)
      .emit(EventType.MESSAGE, { ...rest, chatId: this.LIST_PREFIX + chatId });
  }
}
