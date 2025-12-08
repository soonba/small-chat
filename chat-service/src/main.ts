import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { CHAT_SYSTEM_QUEUE } from './chat/web/types';

export const rabbitMQUrl = process.env.RMQ_URL;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQUrl],
      queue: CHAT_SYSTEM_QUEUE,
      queueOptions: { durable: true },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3010);
}

bootstrap();
