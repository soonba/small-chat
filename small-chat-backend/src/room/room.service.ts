import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomInput } from '../user/inputs/create-room.input';
import { v4 as uuid } from 'uuid';
import { GetRoomDetailInput } from './inputs/room.input';
import { MessageService } from '../message/message.service';

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

  async getRoomAndMessageHistoryById(input: GetRoomDetailInput) {
    const roomId = input.roomId;
    const room = await this.roomModel.find({ roomId }).exec();
    console.log('room________________________');
    console.log(room);
    console.log('room________________________');
    await this.messageService.findAllByRoomId(roomId);
    return {
      roomId: '',
      roomName: '',
      messages: [],
    };
  }
}
