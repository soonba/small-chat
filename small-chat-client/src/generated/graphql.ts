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
};

export type CreateRoomInput = {
  roomName: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateRoomResponse = {
  __typename?: 'CreateRoomResponse';
  roomId: Scalars['String']['output'];
};

export type GeneralResponse = {
  __typename?: 'GeneralResponse';
  message: Scalars['String']['output'];
};

export type GetRoomDetailInput = {
  /** 채팅방 id */
  roomId: Scalars['String']['input'];
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
  sender: Scalars['String']['input'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
  messageId: Scalars['String']['output'];
  roomId: Scalars['String']['output'];
  sender: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoom: CreateRoomResponse;
  /** 로그인/회원가입 */
  join: JoinResponse;
  send: GeneralResponse;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationJoinArgs = {
  input: JoinInput;
};


export type MutationSendArgs = {
  input: MessageInput;
};

export type MyRoomsResponse = {
  __typename?: 'MyRoomsResponse';
  /** 내 채팅방 목록 */
  participationRooms: Array<ParticipationRoom>;
};

export type ParticipationRoom = {
  __typename?: 'ParticipationRoom';
  /** 채팅방 ID */
  roomId: Scalars['String']['output'];
  /** 채팅방 이름 */
  roomName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getMyChattingList: MyRoomsResponse;
  getRoomDetails: RoomInfoResponse;
};


export type QueryGetMyChattingListArgs = {
  input: UserToken;
};


export type QueryGetRoomDetailsArgs = {
  input: GetRoomDetailInput;
};

export type RoomInfoResponse = {
  __typename?: 'RoomInfoResponse';
  /** 메시지 */
  messages: Array<MessageResponse>;
  /** 방 ID */
  roomId: Scalars['String']['output'];
  /** 방 제목 */
  roomName: Scalars['String']['output'];
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

export type CreateRoomMutationVariables = Exact<{
  input: CreateRoomInput;
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'CreateRoomResponse', roomId: string } };

export type SubscribeRoomSubscriptionVariables = Exact<{
  input: SubscriptionInput;
}>;


export type SubscribeRoomSubscription = { __typename?: 'Subscription', subscribeRoom: { __typename?: 'MessageResponse', messageId: string, roomId: string, sender: string, message: string } };

export type SendMutationVariables = Exact<{
  input: MessageInput;
}>;


export type SendMutation = { __typename?: 'Mutation', send: { __typename?: 'GeneralResponse', message: string } };

export type GetMyChattingListQueryVariables = Exact<{
  input: UserToken;
}>;


export type GetMyChattingListQuery = { __typename?: 'Query', getMyChattingList: { __typename?: 'MyRoomsResponse', participationRooms: Array<{ __typename?: 'ParticipationRoom', roomId: string, roomName: string }> } };

export type GetRoomDetailsQueryVariables = Exact<{
  input: GetRoomDetailInput;
}>;


export type GetRoomDetailsQuery = { __typename?: 'Query', getRoomDetails: { __typename?: 'RoomInfoResponse', roomId: string, roomName: string, messages: Array<{ __typename?: 'MessageResponse', roomId: string, sender: string, message: string, messageId: string }> } };


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
export const CreateRoomDocument = gql`
    mutation createRoom($input: CreateRoomInput!) {
  createRoom(input: $input) {
    roomId
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const SubscribeRoomDocument = gql`
    subscription subscribeRoom($input: SubscriptionInput!) {
  subscribeRoom(input: $input) {
    messageId
    roomId
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
export const SendDocument = gql`
    mutation send($input: MessageInput!) {
  send(input: $input) {
    message
  }
}
    `;
export type SendMutationFn = Apollo.MutationFunction<SendMutation, SendMutationVariables>;

/**
 * __useSendMutation__
 *
 * To run a mutation, you first call `useSendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMutation, { data, loading, error }] = useSendMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMutation(baseOptions?: Apollo.MutationHookOptions<SendMutation, SendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMutation, SendMutationVariables>(SendDocument, options);
      }
export type SendMutationHookResult = ReturnType<typeof useSendMutation>;
export type SendMutationResult = Apollo.MutationResult<SendMutation>;
export type SendMutationOptions = Apollo.BaseMutationOptions<SendMutation, SendMutationVariables>;
export const GetMyChattingListDocument = gql`
    query getMyChattingList($input: UserToken!) {
  getMyChattingList(input: $input) {
    participationRooms {
      roomId
      roomName
    }
  }
}
    `;

/**
 * __useGetMyChattingListQuery__
 *
 * To run a query within a React component, call `useGetMyChattingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyChattingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyChattingListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetMyChattingListQuery(baseOptions: Apollo.QueryHookOptions<GetMyChattingListQuery, GetMyChattingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyChattingListQuery, GetMyChattingListQueryVariables>(GetMyChattingListDocument, options);
      }
export function useGetMyChattingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyChattingListQuery, GetMyChattingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyChattingListQuery, GetMyChattingListQueryVariables>(GetMyChattingListDocument, options);
        }
export type GetMyChattingListQueryHookResult = ReturnType<typeof useGetMyChattingListQuery>;
export type GetMyChattingListLazyQueryHookResult = ReturnType<typeof useGetMyChattingListLazyQuery>;
export type GetMyChattingListQueryResult = Apollo.QueryResult<GetMyChattingListQuery, GetMyChattingListQueryVariables>;
export const GetRoomDetailsDocument = gql`
    query getRoomDetails($input: GetRoomDetailInput!) {
  getRoomDetails(input: $input) {
    roomId
    roomName
    messages {
      roomId
      sender
      message
      messageId
    }
  }
}
    `;

/**
 * __useGetRoomDetailsQuery__
 *
 * To run a query within a React component, call `useGetRoomDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomDetailsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetRoomDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetRoomDetailsQuery, GetRoomDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomDetailsQuery, GetRoomDetailsQueryVariables>(GetRoomDetailsDocument, options);
      }
export function useGetRoomDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomDetailsQuery, GetRoomDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomDetailsQuery, GetRoomDetailsQueryVariables>(GetRoomDetailsDocument, options);
        }
export type GetRoomDetailsQueryHookResult = ReturnType<typeof useGetRoomDetailsQuery>;
export type GetRoomDetailsLazyQueryHookResult = ReturnType<typeof useGetRoomDetailsLazyQuery>;
export type GetRoomDetailsQueryResult = Apollo.QueryResult<GetRoomDetailsQuery, GetRoomDetailsQueryVariables>;