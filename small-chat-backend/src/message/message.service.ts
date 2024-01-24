import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { MessageInput, MessageResponse } from './models/message.model';
import { PUB_SUB } from '../../libs/graphql/subscription.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    @Inject(PUB_SUB) private readonly pubsub: RedisPubSub,
  ) {}

  async findAllByRoomId(roomId: string): Promise<MessageResponse[]> {
    const result = await this.messageModel.find({ roomId }).exec();
    return [];
  }

  async save(input: MessageInput) {
    const { roomId, sender, message } = input;
    const saved = await new this.messageModel({
      ...input,
      messageId: uuid(),
    }).save();
    console.log(saved);
    await this.pubsub.publish(roomId, {
      messageId: saved.messageId,
      roomId,
      sender,
      message,
    });
  }
}
