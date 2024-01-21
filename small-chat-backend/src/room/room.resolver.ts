import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import { JoinResponse } from '../user/models/join.model';
import { UserToken } from 'src/user/inputs/user.token';

import { Inject } from '@nestjs/common';
import { PUB_SUB } from 'libs/graphql/subscription.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { SubscriptionInput } from './inputs/room.input';
import { MessageResponse } from '../message/models/message.model';
import { RoomService } from './room.service';

@Resolver()
export class RoomResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
    private readonly roomService: RoomService,
  ) {}

  //todo
  @Query(() => JoinResponse)
  async getRooms(
    @Args({
      name: 'input',
      description: 'Args 입력',
      type: () => UserToken,
    })
    input: UserToken,
  ) {
    console.log(input.userId);
    return {
      userId: input.userId,
    };
  }

  @Subscription(() => MessageResponse, {
    resolve: (value) => value,
  })
  async subscribeRoom(
    @Args({
      name: 'input',
      description: '방 정보 입력',
      type: () => SubscriptionInput,
    })
    input: SubscriptionInput,
  ) {
    return this.pubsub.asyncIterator(input.roomIds);
  }
}
