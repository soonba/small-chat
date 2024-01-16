import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GeneralResponse {
  @Field(() => String)
  message: string;
}
