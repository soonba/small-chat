import { Controller, Get } from '@nestjs/common';
import { ChatKafkaProducer } from './chat.kafka.producer';

@Controller('/test/api/v2')
export class ChatController {
  constructor(private readonly chatKafkaProducer: ChatKafkaProducer) {}

  @Get()
  async testChat() {
    await this.chatKafkaProducer.send({
      roomId: 'cbd341a5-c1df-406c-a1f6-d704b8b7d004',
      userId: '8a3623c1-4955-4753-a6c4-c81dcde36ab2',
      nickname: 'nskb111111!',
      message: '카프카 테스트',
    });
  }
}
