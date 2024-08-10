import { EmptyText, Loader } from 'components';

import { useGetChatList } from 'services/chat';

import ChatListItem from './components/ChatListItem';

export default function Chat() {
    const { isFetching, data } = useGetChatList();

    return (
        <div className="relative min-h-full w-full p-5">
            {isFetching ? (
                <div className="flex h-full min-h-[calc(100vh-176px)] w-full items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <ul className="mb-28 h-full min-h-inherit space-y-2.5">
                    {!data || data.length === 0 ? (
                        <li className="flex h-80 w-full items-center justify-center">
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
