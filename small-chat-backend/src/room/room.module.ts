import { Module } from '@nestjs/common';
import { RoomResolver } from './room.resolver';
import { SubscriptionModule } from 'libs/graphql/subscription.module';

@Module({
  imports: [SubscriptionModule],
  providers: [RoomResolver],
})
export class RoomModule {}
