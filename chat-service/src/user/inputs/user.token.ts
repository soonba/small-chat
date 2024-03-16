import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserToken {
  @Field(() => String)
  userId: string;
}
