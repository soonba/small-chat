import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SubscriptionConfig } from '@nestjs/graphql';
import * as process from 'process';
import { join } from 'path';

const subscriptions: SubscriptionConfig = {
  'graphql-ws': {
    path: '/graphql',
  },
};

export const GraphqlOptions: ApolloDriverConfig = {
  driver: ApolloDriver,
  path: '/graphql',
  autoTransformHttpErrors: true,
  subscriptions,
  autoSchemaFile: join(process.cwd(), 'libs/graphql/schema.gql'),
  playground: true,
};
