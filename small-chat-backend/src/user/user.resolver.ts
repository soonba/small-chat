import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { JoinResponse } from './models/join.model';
import { JoinInput } from './inputs/user.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => JoinResponse)
  async a() {
    return {};
  }
  @Mutation(() => JoinResponse, { description: '로그인/회원가입' })
  async join(
    @Args({
      name: 'input',
      description: 'Args 입력',
      type: () => JoinInput,
    })
    input: JoinInput,
  ): Promise<JoinResponse> {
    return await this.userService.loginOrCreateUser(input);
  }
}
