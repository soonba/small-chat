import { Loader } from '@components/Loader';
import { EmptyText } from '@components/Placeholder';

import { useGetChatList } from '@services/chat';

import ChatListItem from './components/ChatListItem';

export default function ChatList() {
  const { data, isFetching } = useGetChatList();

  return (
    <div className="size-full min-h-[calc(100vh-176px)] p-5">
      {isFetching ? (
        <div className="flex size-full min-h-inherit items-center justify-center">
          <Loader />
        </div>
      ) : (
        <ul className="mb-8 min-h-inherit space-y-2.5">
          {!data || data.length === 0 ? (
            <li className="flex min-h-inherit w-full items-center justify-center">
              <EmptyText text="채팅에 참여해 보세요." />
            </li>
          ) : (
            data.map((item) => <ChatListItem key={item.chatId} data={item} />)
          )}
        </ul>
      )}
    </div>
  );
}
