import { Module } from '@nestjs/common';
import { ChatService } from './domain/chat.service';

@Module({
  imports: [
    // MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatService],
})
export class ChatModule {}
