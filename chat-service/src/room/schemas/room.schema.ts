import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type RoomDocument = Room & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Room {
  @Prop()
  roomId: string;
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;
  @Prop()
  host: string;
  @Prop()
  roomName: string;
  @Prop({ default: [] })
  participationIds: string[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
