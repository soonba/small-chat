import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomInput } from '../user/inputs/create-room.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
  ) {}

  async createRoom(input: CreateRoomInput) {
    const savedRoom = await new this.roomModel({
      roomId: uuid(),
      host: input.userId,
      roomName: input.roomName,
    }).save();

    const { roomId } = savedRoom;
    return {
      roomId,
    };
  }
}
