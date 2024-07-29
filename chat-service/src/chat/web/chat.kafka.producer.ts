import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Message } from '../domain/model/message';

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

  async send(message: Message) {
    await this.kafkaService.emit(this.TOPIC, message);
  }
}
