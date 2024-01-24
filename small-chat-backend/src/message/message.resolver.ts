import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { MessageInput } from './models/message.model';
import { GeneralResponse } from 'libs/graphql/general.response';
import { MessageService } from './message.service';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => GeneralResponse)
  async send(
    @Args({
      name: 'input',
      description: '메시지',
      type: () => MessageInput,
    })
    input: MessageInput,
  ) {
    await this.messageService.save(input);
    return {
      message: 'succeed',
    };
  }
}
