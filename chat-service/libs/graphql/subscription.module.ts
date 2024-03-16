import { Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export const PUB_SUB = 'PUB_SUB';
export const isISO8601Z =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
export const redisPubSubOptions = {
  connection: {
    host: 'pubsub',
    port: 6379,
  },
  reviver: (key, value) => {
    if (typeof value === 'string' && isISO8601Z.test(value)) {
      const tempDateNumber = Date.parse(value);
      if (!isNaN(tempDateNumber)) return new Date(tempDateNumber);
    }
    return value;
  },
};

@Module({
  providers: [
    {
      provide: PUB_SUB,
      useValue: new RedisPubSub(redisPubSubOptions),
    },
  ],
  exports: [PUB_SUB, SubscriptionModule],
})
export class SubscriptionModule {}
