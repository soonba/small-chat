import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field(() => String)
  roomId: string;

  @Field(() => String)
  sender: string;

  @Field(() => String)
  message: string;
}

@InputType()
export class MessageInput {
  @Field(() => String)
  roomId: string;

  @Field(() => String)
  sender: string;

  @Field(() => String)
  message: string;
}
