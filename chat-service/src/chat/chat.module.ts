import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatController } from './web/chat.controller';
import { ChatKafkaProducer } from './web/chat.kafka.producer';
import { EventsGateway } from './web/events.gateway';

export const KAFKA_SERVICE = Symbol();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            // brokers: ['localhost:9092'],
            brokers: ['kafka-1:29092'],
          },
        },
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [EventsGateway, ChatKafkaProducer],
})
export class ChatModule {}
