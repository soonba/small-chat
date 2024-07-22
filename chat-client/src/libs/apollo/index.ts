/* eslint-disable no-console */
import { ApolloClient, InMemoryCache, HttpLink, from, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

import appConfig from 'config';

const httpLink = new HttpLink({
    uri: `${appConfig.graphqlApiUrl}`
});

export const wsLink = new GraphQLWsLink(
    createClient({
        url: appConfig.graphqlSubscriptionUrl || '',
        lazy: true
    })
);

const httpAndWsLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

const errorLink = onError(({ graphQLErrors, networkError, operation, response }) => {
    console.log('response: ', response);
    console.log('graphQLErrors: ', graphQLErrors);
    console.log('networkError: ', networkError);
    console.log('operation: ', operation);
});

const client = new ApolloClient({
    link: from([errorLink, httpAndWsLink]),
    cache: new InMemoryCache({
        addTypename: false
    })
});

export default client;
