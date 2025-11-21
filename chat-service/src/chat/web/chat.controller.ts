import { Controller, Get } from '@nestjs/common';
import { ChatRabbitMQProducer } from './chat.rmq.producer';

@Controller('/test/api/v2')
export class ChatController {
  constructor(private readonly rmqProducer: ChatRabbitMQProducer) {}

  @Get()
  async testChat() {
    await this.rmqProducer.send({
      chatId: 'cbd341a5-c1df-406c-a1f6-d704b8b7d004',
      userId: '8a3623c1-4955-4753-a6c4-c81dcde36ab2',
      nickname: 'kim-01',
      message: 'rmq 테스트',
    });
  }
}
