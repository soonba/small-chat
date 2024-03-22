import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { SubscriptionModule } from 'libs/graphql/subscription.module';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    SubscriptionModule,
    MessageModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
