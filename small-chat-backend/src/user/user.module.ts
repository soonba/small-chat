import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { RoomModule } from '../room/room.module';
import { MessageModule } from '../message/message.module';
import { SubscriptionModule } from '../../libs/graphql/subscription.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RoomModule,
    MessageModule,
    SubscriptionModule,
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
