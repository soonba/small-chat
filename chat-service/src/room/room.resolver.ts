import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';

import { Inject } from '@nestjs/common';
import { PUB_SUB } from 'libs/graphql/subscription.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import {
  GetRoomDetailInput,
  GetRoomLatestInfosInput,
  SubscriptionInput,
} from './inputs/room.input';
import { MessageResponse } from '../message/models/message.model';
import { RoomService } from './room.service';
import { RoomInfoResponse, RoomResponse } from './model/room.info.model';

@Resolver()
export class RoomResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
    private readonly roomService: RoomService,
  ) {}

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

  @Query(() => [RoomResponse])
  async getRoomLatestInfos(
    @Args({
      name: 'input',
      description: 'Args 입력',
      type: () => GetRoomLatestInfosInput,
    })
    input: GetRoomLatestInfosInput,
  ): Promise<RoomResponse[]> {
    return await this.roomService.getRoomLatestInfos(input);
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
