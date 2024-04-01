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
  @Field(() => String, { nullable: false })
  messageId: string;

  @Field(() => String, { nullable: false })
  roomId: string;

  @Field(() => Sender, { nullable: false })
  sender: Sender;

  @Field(() => Date, { nullable: false })
  createdAt: Date;

  @Field(() => String, { nullable: false })
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
  nickname: string;

  @Field(() => String)
  message: string;
}

@InputType()
export class MessageHistoryInput {
  @Field(() => String)
  roomId: string;
}

@ObjectType()
export class MessageHistoryResponse {
  @Field(() => [MessageResponse], { description: '메시지' })
  messages: MessageResponse[];
}
