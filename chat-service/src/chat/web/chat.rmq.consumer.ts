import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventsGateway } from './events.gateway';
import { MessageEventType } from '../domain/model/message';
import { ROUTING_SYSTEM } from './types';

@Controller()
export class ChatRabbitMQConsumer {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @EventPattern(ROUTING_SYSTEM)
  async handleMessage(
    @Payload() payload: MessageEventType,
    @Ctx() context: RmqContext,
  ) {
    await this.eventsGateway.send(payload);
  }
}
