import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { SubscriptionModule } from 'libs/graphql/subscription.module';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
  imports: [
    SubscriptionModule,
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  providers: [RoomResolver, RoomService],
  exports: [RoomService],
})
export class RoomModule {}
