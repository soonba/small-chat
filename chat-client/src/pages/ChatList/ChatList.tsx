import { ChatList as ChatListComponent, ChatListItem } from '@components/ChatList';

import { useGetChatList } from '@services/chat';

export default function ChatList() {
  const { data, isFetching } = useGetChatList();

  return (
    <div className="size-full min-h-[calc(100vh-176px)] p-2.5 sm:p-5">
      <ChatListComponent
        data={data || []}
        emptyText="채팅에 참여해 보세요."
        renderItem={(data) => <ChatListItem key={data.chatId} {...data} />}
        isLoading={isFetching}
      />
    </div>
  );
}
