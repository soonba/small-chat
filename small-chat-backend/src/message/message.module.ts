import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { SubscriptionModule } from 'libs/graphql/subscription.module';

@Module({
  imports: [SubscriptionModule],
  providers: [MessageResolver],
})
export class MessageModule {}
