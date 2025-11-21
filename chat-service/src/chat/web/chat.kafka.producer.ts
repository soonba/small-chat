import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { RMQ_SVC } from '../chat.module';
import { Message } from '../domain/model/message';

@Injectable()
export class ChatKafkaProducer implements OnModuleInit {
  private readonly TOPIC = 'publish_message';

  constructor(@Inject(RMQ_SVC) private readonly kafkaService: ClientKafka) {}

  async onModuleInit() {
    this.kafkaService.subscribeToResponseOf(this.TOPIC);
    await this.kafkaService.connect();
  }

  async send(message: Message) {
    await this.kafkaService.emit(this.TOPIC, message);
  }
}
