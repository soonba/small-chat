import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JoinResponse {
  @Field(() => String, { description: '유저 ID' })
  userId: string;

  @Field(() => String, { description: '닉네임' })
  nickname: string;
}
