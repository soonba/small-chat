import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Message {
  @Prop()
  messageId: string;
  @Prop()
  roomId: string;
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;
  @Prop()
  sender: string;
  @Prop()
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
