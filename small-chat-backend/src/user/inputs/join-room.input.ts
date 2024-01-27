import { Field, InputType } from '@nestjs/graphql';
import { UserToken } from './user.token';

@InputType()
export class JoinRoomInput extends UserToken {
  @Field(() => String)
  roomId: string;
}
