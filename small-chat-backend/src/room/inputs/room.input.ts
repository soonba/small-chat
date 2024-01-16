import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubscriptionInput {
  @Field(() => [String], { description: '채팅방 IDs' })
  roomIds: string[];
}
