import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { MessageResponse, SaveMessageInput } from './models/message.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async findAllByRoomId(roomId: string): Promise<MessageResponse[]> {
    const result = await this.messageModel.find({ roomId }).exec();
    return [];
  }

  async save(input: SaveMessageInput) {
    return await new this.messageModel({
      ...input,
      messageId: uuid(),
    }).save();
  }
}
