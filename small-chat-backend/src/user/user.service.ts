import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JoinInput } from './inputs/user.input';
import { v4 as uuid } from 'uuid';
import { UserToken } from './inputs/user.token';
import { CreateRoomInput } from './inputs/create-room.input';
import { RoomService } from '../room/room.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private readonly roomService: RoomService,
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
}
