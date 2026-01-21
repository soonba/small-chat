import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatController } from './web/chat.controller';
import { ChatRabbitMQProducer } from './web/chat.rmq.producer';
import { EventsGateway } from './web/events.gateway';
import { ChatRabbitMQConsumer } from './web/chat.rmq.consumer';
import { CHAT_MESSAGE_QUEUE } from './web/types';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RMQ_SVC',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [config.get<string>('RMQ_URL')], // 이제 정상 주입됨
              queue: CHAT_MESSAGE_QUEUE,
              queueOptions: { durable: true },
            },
          };
        },
      },
    ]),
  ],
  controllers: [ChatController, ChatRabbitMQConsumer],
  providers: [EventsGateway, ChatRabbitMQProducer],
})
export class ChatModule {}
