import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { MessageEvent } from '../domain/model/message';

/**
 * 채팅 서비스 -> 큐 -> 백엔드 컨슈머
 */
@Injectable()
export class ChatRabbitMQProducer implements OnModuleInit {
  private readonly ROUTING_KEY = 'chat.message';

  constructor(@Inject('RMQ_SVC') private readonly rmqService: ClientRMQ) {}

  async onModuleInit() {
    await this.rmqService.connect();
  }

  async send(message: MessageEvent) {
    this.rmqService.emit(this.ROUTING_KEY, message);
  }
}
