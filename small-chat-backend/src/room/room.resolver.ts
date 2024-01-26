import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Inject } from '@nestjs/common';
import { PUB_SUB } from 'libs/graphql/subscription.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { GetRoomDetailInput, SubscriptionInput } from './inputs/room.input';
import { MessageResponse } from '../message/models/message.model';
import { RoomService } from './room.service';
import { RoomInfoResponse } from './model/room.info.model';

@Resolver()
export class RoomResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
    private readonly roomService: RoomService,
  ) {}

  //todo
  @Query(() => RoomInfoResponse)
  async getRoomDetails(
    @Args({
      name: 'input',
      description: 'Args 입력',
      type: () => GetRoomDetailInput,
    })
    input: GetRoomDetailInput,
  ): Promise<RoomInfoResponse> {
    return await this.roomService.getRoomAndMessageHistoryById(input);
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
