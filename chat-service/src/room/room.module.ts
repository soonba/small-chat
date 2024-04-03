import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { SubscriptionModule } from 'libs/graphql/subscription.module';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { MessageModule } from '../message/message.module';
import { Message, MessageSchema } from '../message/schemas/message.schema';

@Module({
  imports: [
    SubscriptionModule,
    MessageModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
