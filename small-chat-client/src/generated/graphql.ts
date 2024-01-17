import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type GeneralResponse = {
  __typename?: 'GeneralResponse';
  message: Scalars['String']['output'];
};

export type JoinInput = {
  /** 닉네임 */
  nickname: Scalars['String']['input'];
};

export type JoinResponse = {
  __typename?: 'JoinResponse';
  /** 닉네임 */
  nickname: Scalars['String']['output'];
  /** 유저 ID */
  userId: Scalars['String']['output'];
};

export type MessageInput = {
  message: Scalars['String']['input'];
  roomId: Scalars['String']['input'];
  sendAt: Scalars['DateTime']['input'];
  sender: Scalars['String']['input'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
  roomId: Scalars['String']['output'];
  sendAt: Scalars['DateTime']['output'];
  sender: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 로그인/회원가입 */
  join: JoinResponse;
  send: GeneralResponse;
};


export type MutationJoinArgs = {
  input: JoinInput;
};


export type MutationSendArgs = {
  input: MessageInput;
};

export type Query = {
  __typename?: 'Query';
  a: JoinResponse;
  getMyChattingList: JoinResponse;
};


export type QueryGetMyChattingListArgs = {
  input: UserToken;
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeRoom: MessageResponse;
};


export type SubscriptionSubscribeRoomArgs = {
  input: SubscriptionInput;
};

export type SubscriptionInput = {
  /** 채팅방 IDs */
  roomIds: Array<Scalars['String']['input']>;
};

export type UserToken = {
  userId: Scalars['String']['input'];
};

export type JoinMutationVariables = Exact<{
  input: JoinInput;
}>;


export type JoinMutation = { __typename?: 'Mutation', join: { __typename?: 'JoinResponse', userId: string, nickname: string } };

export type SubscribeRoomSubscriptionVariables = Exact<{
  input: SubscriptionInput;
}>;


export type SubscribeRoomSubscription = { __typename?: 'Subscription', subscribeRoom: { __typename?: 'MessageResponse', roomId: string, sendAt: any, sender: string, message: string } };


export const JoinDocument = gql`
    mutation join($input: JoinInput!) {
  join(input: $input) {
    userId
    nickname
  }
}
    `;
export type JoinMutationFn = Apollo.MutationFunction<JoinMutation, JoinMutationVariables>;

/**
 * __useJoinMutation__
 *
 * To run a mutation, you first call `useJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMutation, { data, loading, error }] = useJoinMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useJoinMutation(baseOptions?: Apollo.MutationHookOptions<JoinMutation, JoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinMutation, JoinMutationVariables>(JoinDocument, options);
      }
export type JoinMutationHookResult = ReturnType<typeof useJoinMutation>;
export type JoinMutationResult = Apollo.MutationResult<JoinMutation>;
export type JoinMutationOptions = Apollo.BaseMutationOptions<JoinMutation, JoinMutationVariables>;
export const SubscribeRoomDocument = gql`
    subscription subscribeRoom($input: SubscriptionInput!) {
  subscribeRoom(input: $input) {
    roomId
    sendAt
    sender
    message
  }
}
    `;

/**
 * __useSubscribeRoomSubscription__
 *
 * To run a query within a React component, call `useSubscribeRoomSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeRoomSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeRoomSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubscribeRoomSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeRoomSubscription, SubscribeRoomSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeRoomSubscription, SubscribeRoomSubscriptionVariables>(SubscribeRoomDocument, options);
      }
export type SubscribeRoomSubscriptionHookResult = ReturnType<typeof useSubscribeRoomSubscription>;
export type SubscribeRoomSubscriptionResult = Apollo.SubscriptionResult<SubscribeRoomSubscription>;