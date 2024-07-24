import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './chat/adapter/redis.io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisIoAdapter: RedisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(3010);
}

bootstrap();
