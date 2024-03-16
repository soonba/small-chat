import { Field, InputType } from '@nestjs/graphql';
import { UserToken } from './user.token';

@InputType()
export class CreateRoomInput extends UserToken {
  @Field(() => String)
  roomName: string;
}
