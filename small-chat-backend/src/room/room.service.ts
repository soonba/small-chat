import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomInput } from '../user/inputs/create-room.input';
import { v4 as uuid } from 'uuid';
import { GetRoomDetailInput } from './inputs/room.input';
import { MessageService } from '../message/message.service';
import { RoomInfoResponse } from './model/room.info.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
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
      messages: [
        {
          messageId: 'msg1',
          roomId: roomId,
          sender: { userId: 'abcde', nickname: 'nick1' },
          message: 'hello?',
        },
        {
          messageId: 'msg2',
          roomId: roomId,
          sender: { userId: 'effff', nickname: 'nick2' },
          message: 'hi...',
        },
      ],
    };
  }
}
