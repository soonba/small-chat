import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParticipationRoom {
  @Field(() => String, { description: '채팅방 ID', nullable: false })
  roomId: string;
  @Field(() => String, { description: '채팅방 이름', nullable: false })
  roomName: string;
}
@ObjectType()
export class MyRoomsResponse {
  @Field(() => [ParticipationRoom], { description: '내 채팅방 목록' })
  participationRooms: ParticipationRoom[];
}
