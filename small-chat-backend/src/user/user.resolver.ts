import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { JoinResponse } from './models/join.model';
import { JoinInput } from './inputs/user.input';
import { UserToken } from './inputs/user.token';
import { MyRoomsResponse } from './models/my-rooms.model';
import { CreateRoomInput } from './inputs/create-room.input';
import { CreateRoomResponse } from './models/create.room.model';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => MyRoomsResponse)
  async getMyChattingList(
    @Args({
      name: 'input',
      description: 'Args 입력',
      type: () => UserToken,
    })
    input: UserToken,
  ): Promise<MyRoomsResponse> {
    return {
      participationRooms: await this.userService.getRoomsByUserToken(input),
    };
  }

  @Mutation(() => CreateRoomResponse)
  async createRoom(
    @Args({
      name: 'input',
      description: 'Args 입력',
      type: () => CreateRoomInput,
    })
    input: CreateRoomInput,
  ): Promise<CreateRoomResponse> {
    return await this.userService.createRoom(input);
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
