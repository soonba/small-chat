import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import {
  MessageHistoryResponse,
  MessageResponse,
  SaveMessageInput,
} from './models/message.model';
import { v4 as uuid } from 'uuid';
import * as dayjs from 'dayjs';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async findAllByRoomId(roomId: string): Promise<MessageResponse[]> {
    return await this.messageModel.find({ roomId }).exec();
  }

  async findAllByRoomIdV2(roomId: string): Promise<MessageHistoryResponse> {
    const messages = await this.messageModel.find({ roomId }).exec();
    return { messages };
  }

  async save(input: SaveMessageInput) {
    return await new this.messageModel({
      ...input,
      createdAt: dayjs(),
      messageId: uuid(),
    }).save();
  }
}
