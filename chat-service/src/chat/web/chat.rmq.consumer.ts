import { Injectable } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventsGateway } from './events.gateway';

interface RabbitMQPayload<T = any> {
  type: string; // "chat.message"
  data: T;
}

interface MessageEvent {
  chatId: string;
  senderId: string;
  content: string;
  timestamp: number;
}

//TODO 검토
@Injectable()
export class ChatRabbitMQConsumer {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @EventPattern('chat.message')
  async handleMessage(
    @Payload() payload: RabbitMQPayload<MessageEvent>,
    @Ctx() context: RmqContext,
  ) {
    console.log('payload');
    console.log(payload);
    console.log('payload');
    const channel = context.getChannelRef();
    const msg = context.getMessage();

    try {
      if (!payload || payload.type !== 'chat.message') {
        console.error('Invalid payload:', payload);
        channel.ack(msg);
        return;
      }

      const message = payload.data;
      const { chatId } = message;

      // 원래 방
      this.eventsGateway.server.to(chatId).emit('MESSAGE', message);

      // 리스트 방
      this.eventsGateway.server
        .to('list_' + chatId)
        .emit('MESSAGE', { ...message, chatId: 'list_' + chatId });

      channel.ack(msg);
    } catch (err) {
      console.error('Consumer error:', err);
      channel.nack(msg, false, false);
    }
  }
}
