import { Field, ObjectType } from '@nestjs/graphql';
import { MessageResponse } from '../../message/models/message.model';

@ObjectType()
@ObjectType()
export class RoomInfoResponse {
  @Field(() => String, { description: '방 ID' })
  roomId: string;

  @Field(() => String, { description: '방 제목' })
  roomName: string;

  @Field(() => [MessageResponse], { description: '메시지' })
  messages: MessageResponse[];
}
