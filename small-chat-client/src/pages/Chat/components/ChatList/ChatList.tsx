import ChatListItem from './ChatListItem';

type ChatListType = {
    onClick: (id: string) => void;
};

// TODO: Remove Dummy
export default function ChatList({ onClick }: ChatListType) {
    return (
        <div className="fixed bottom-0 left-0 top-16 w-96 py-2 shadow-md">
            <ul className="max-h-[calc(100vh-64px)] w-full space-y-5 overflow-y-auto p-5 custom-scroll">
                {[...Array(100).keys()].map((val) => (
                    <ChatListItem key={val} onClick={onClick} />
                ))}
            </ul>
        </div>
    );
}
