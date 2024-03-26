import { Field, ObjectType } from '@nestjs/graphql';
import { MessageResponse } from '../../message/models/message.model';

@ObjectType()
export class RoomInfoResponse {
  @Field(() => String, { description: '방 ID' })
  roomId: string;

  @Field(() => String, { description: '방 제목' })
  roomName: string;

  @Field(() => [MessageResponse], { description: '메시지' })
  messages: MessageResponse[];
}

@ObjectType()
export class RoomResponse {
  @Field(() => String, { description: '방 ID' })
  roomId: string;

  @Field(() => String, { description: '마지막 메시지' })
  lastMessage: string;

  @Field(() => String, {
    description: '마지막 메시지 전송자 닉네임',
  })
  lastMessageSenderNickname: string;

  @Field(() => Date, { description: '마지막 메시지 전송 시각' })
  lastMessageTime: Date;
}
