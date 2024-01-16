import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt ' } })
export class User {
  @Prop()
  userId: string;
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;
  @Prop()
  nickname: string;
  @Prop({ default: [] })
  hostRooms: string[];
  @Prop({ default: [] })
  participatingRooms: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
