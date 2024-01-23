import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async findAllByRoomId(roomId: string) {
    const result = await this.messageModel.find({ roomId }).exec();
    console.log('result________________________');
    console.log(result);
    console.log('result________________________');
  }
}
