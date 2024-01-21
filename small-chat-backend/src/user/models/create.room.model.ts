import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateRoomResponse {
  @Field(() => String)
  roomId: string;
}
