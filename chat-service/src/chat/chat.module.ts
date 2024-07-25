import { Module } from '@nestjs/common';
import { EventsGateway } from './web/events.gateway';
import { ChatKafkaProducer } from './web/chat.kafka.producer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            //todo docker-compose 수정
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  providers: [EventsGateway, ChatKafkaProducer],
})
export class ChatModule {}
