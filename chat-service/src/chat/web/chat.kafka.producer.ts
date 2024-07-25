import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Chat } from '../domain/model/chat';

@Injectable()
export class ChatKafkaProducer implements OnModuleInit {
  private readonly TOPIC = 'publish_chat';

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaService: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaService.subscribeToResponseOf(this.TOPIC);
    await this.kafkaService.connect();
  }

  async send(chat: Chat) {
    this.kafkaService.emit(this.TOPIC, chat);
  }
}
