import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessageEventType } from '../domain/model/message';
import { ROUTING_MESSAGE } from './types';

/**
 * 채팅 서비스 -> 큐 -> 백엔드 컨슈머
 */
@Injectable()
export class ChatRabbitMQProducer implements OnModuleInit {
  constructor(@Inject('RMQ_SVC') private readonly rmqService: ClientProxy) {}

  async onModuleInit() {
    try {
      await this.rmqService.connect();
    } catch (e) {
      console.log(e);
    }
  }

  async send(message: MessageEventType) {
    this.rmqService.emit(ROUTING_MESSAGE, message);
  }
}
