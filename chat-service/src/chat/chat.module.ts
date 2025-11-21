import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatController } from './web/chat.controller';
import { ChatKafkaProducer } from './web/chat.kafka.producer';
import { EventsGateway } from './web/events.gateway';

export const RMQ_SVC = Symbol();
@Module({
  imports: [
    ClientsModule.register([
      {
        name: RMQ_SVC,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'], // RMQ 접속 URL
          queue: 'chat.message.queue', // consume할 queue
          queueOptions: {
            durable: true, // 메시지 영속성
          },
        },
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [EventsGateway, ChatKafkaProducer],
})
export class ChatModule {}
