import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Sender } from '../models/message.model';
import * as dayjs from 'dayjs';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Message {
  @Prop()
  messageId: string;
  @Prop()
  roomId: string;
  @Prop({ default: dayjs(), type: mongoose.Schema.Types.Date })
  createdAt: Date;
  @Prop()
  sender: Sender;
  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
