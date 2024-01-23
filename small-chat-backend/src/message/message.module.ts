import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { SubscriptionModule } from 'libs/graphql/subscription.module';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    SubscriptionModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageResolver, MessageService],
  exports: [MessageService],
})
export class MessageModule {}
