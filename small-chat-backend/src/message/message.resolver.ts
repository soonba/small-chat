import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { MessageInput } from './models/message.model';
import { PUB_SUB } from 'libs/graphql/subscription.module';
import { GeneralResponse } from 'libs/graphql/general.response';

@Resolver()
export class MessageResolver {
  constructor(@Inject(PUB_SUB) private readonly pubsub: RedisPubSub) {}

  @Mutation(() => GeneralResponse)
  async send(
    @Args({
      name: 'input',
      description: '메시지',
      type: () => MessageInput,
    })
    input: MessageInput,
  ) {
    await this.pubsub.publish(input.roomId, {
      ...input,
    });

    return {
      message: 'succeed',
    };
  }
}
