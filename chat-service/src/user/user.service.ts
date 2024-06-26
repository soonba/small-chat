import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JoinInput } from './inputs/user.input';
import { v4 as uuid } from 'uuid';
import { UserToken } from './inputs/user.token';
import { CreateRoomInput } from './inputs/create-room.input';
import { RoomService } from '../room/room.service';
import { SubmitMessageInput } from '../message/models/message.model';
import { MessageService } from '../message/message.service';
import { PUB_SUB } from 'libs/graphql/subscription.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { JoinRoomInput } from './inputs/join-room.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly roomService: RoomService,
    private readonly messageService: MessageService,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
  ) {}

  async loginOrCreateUser(input: JoinInput) {
    const user = await this.userModel.findOne({ nickname: input.nickname });
    if (!!user) {
      const { userId, nickname } = user;
      return {
        userId,
        nickname,
      };
    }
    const savedUser = await new this.userModel({
      userId: uuid(),
      nickname: input.nickname,
    }).save();
    const { userId, nickname } = savedUser;
    return {
      userId,
      nickname,
    };
  }

  async getRoomsByUserToken(input: UserToken) {
    const result = await this.userModel.findOne({ userId: input.userId });
    return result.participatingRooms;
  }

  //방 생성, 유저 문서에 참여 중인 방 추가
  async createRoom(input: CreateRoomInput) {
    const user = await this.userModel.findOne({ userId: input.userId });
    const result = await this.roomService.createRoom(input);
    user.participatingRooms.push({
      roomId: result.roomId,
      roomName: input.roomName,
    });
    await user.save();
    return result;
  }

  async findById(userId: string) {
    return await this.userModel.findOne({ userId }).exec();
  }

  async submitMessage(input: SubmitMessageInput) {
    const { userId, nickname, ...rest } = input;
    const { messageId, createdAt } = await this.messageService.save({
      ...rest,
      sender: { userId, nickname },
    });
    const payload = {
      messageId,
      createdAt,
      sender: { userId, nickname },
      ...rest,
    };
    const { roomId } = input;
    await this.pubsub.publish(`list_${roomId}`, payload);
    await this.pubsub.publish(`chat_${roomId}`, payload);
  }

  async joinRoom(input: JoinRoomInput) {
    const { userId, roomId } = input;
    const user = await this.userModel.findOne({ userId }).exec();
    const room = await this.roomService.getRoomById(roomId);
    user.participatingRooms.push({ roomId, roomName: room.roomName });
    room.participationIds.push(userId);
    await user.save();
    await room.save();
  }
}
