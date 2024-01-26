import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Sender {
  @Field(() => String)
  userId: string;
  @Field(() => String)
  nickname: string;
}
@ObjectType()
export class MessageResponse {
  @Field(() => String)
  messageId: string;

  @Field(() => String)
  roomId: string;

  @Field(() => Sender)
  sender: Sender;

  @Field(() => String)
  message: string;
}

@InputType()
export class SaveMessageInput {
  @Field(() => String)
  roomId: string;

  @Field(() => Sender)
  sender: Sender;

  @Field(() => String)
  message: string;
}

@InputType()
export class SubmitMessageInput {
  @Field(() => String)
  roomId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  message: string;
}
