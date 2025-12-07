import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatController } from './web/chat.controller';
import { ChatRabbitMQProducer } from './web/chat.rmq.producer';
import { EventsGateway } from './web/events.gateway';
import { ChatRabbitMQConsumer } from './web/chat.rmq.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RMQ_SVC',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'chat.message.queue', // queue고정
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [EventsGateway, ChatRabbitMQProducer, ChatRabbitMQConsumer],
})
export class ChatModule {}
