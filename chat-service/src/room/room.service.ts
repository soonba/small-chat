import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomInput } from '../user/inputs/create-room.input';
import { v4 as uuid } from 'uuid';
import {
  GetRoomDetailInput,
  GetRoomLatestInfosInput,
} from './inputs/room.input';
import { MessageService } from '../message/message.service';
import { RoomInfoResponse, RoomResponse } from './model/room.info.model';
import { Message, MessageDocument } from '../message/schemas/message.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    private readonly messageService: MessageService,
  ) {}

  async createRoom(input: CreateRoomInput) {
    const savedRoom = await new this.roomModel({
      roomId: uuid(),
      host: input.userId,
      roomName: input.roomName,
      participationIds: [input.userId],
    }).save();

    const { roomId } = savedRoom;
    return {
      roomId,
    };
  }

  async getRoomAndMessageHistoryById(
    input: GetRoomDetailInput,
  ): Promise<RoomInfoResponse> {
    const roomId = input.roomId;
    const room = await this.roomModel.findOne({ roomId }).exec();
    const roomName = room?.roomName ?? '없음';
    const messages = await this.messageService.findAllByRoomId(roomId);
    return {
      roomId,
      roomName,
      messages,
    };
  }

  async getRoomById(roomId: string) {
    return await this.roomModel.findOne({ roomId }).exec();
  }

  async getRoomLatestInfos(input: GetRoomLatestInfosInput) {
    //todo v3.0 성능 개선
    const { roomIds } = input;
    const response: RoomResponse[] = [];
    for (let i = 0; i < roomIds.length; i++) {
      const roomId = roomIds[i];
      const foundModel = await this.messageModel
        .findOne({ roomId })
        .sort({ createdAt: -1 })
        .limit(1)
        .exec();
      if (foundModel) {
        response.push({
          roomId,
          lastMessage: foundModel.message,
          lastMessageSenderNickname: foundModel.sender.nickname,
          lastMessageTime: foundModel.createdAt,
        });
      } else {
        //todo 시스템 메시지로 변경
        response.push({
          roomId,
          lastMessage: '대화를 시작해보세요.',
          lastMessageSenderNickname: '시스템',
          lastMessageTime: new Date(),
        });
      }
    }
    return response;
  }
}
