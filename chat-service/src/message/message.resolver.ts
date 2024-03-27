import { Args, Query, Resolver } from '@nestjs/graphql';
import { MessageService } from './message.service';
import {
  MessageHistoryInput,
  MessageHistoryResponse,
} from './models/message.model';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => MessageHistoryResponse)
  async getHistoryByRoomId(
    @Args({
      name: 'input',
      description: 'Args 입력',
      type: () => MessageHistoryInput,
    })
    input: MessageHistoryInput,
  ): Promise<MessageHistoryResponse> {
    return await this.messageService.findAllByRoomIdV2(input.roomId);
  }
}
