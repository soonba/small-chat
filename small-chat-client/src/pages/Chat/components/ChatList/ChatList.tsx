import ChatListItem from './ChatListItem';
import { ParticipationRoom } from '../../../../generated/graphql';

type ChatListType = {
    rooms: ParticipationRoom[];
    onClick: (id: string) => void;
};

export default function ChatList({ rooms, onClick }: ChatListType) {
    return (
        <div className="fixed bottom-0 left-0 top-16 w-96 py-2 shadow-md">
            <ul className="max-h-[calc(100vh-64px)] w-full space-y-5 overflow-y-auto p-5 custom-scroll">
                {rooms.map((room) => (
                    <ChatListItem key={room.roomId} room={room} onClick={onClick} />
                ))}
            </ul>
        </div>
    );
}
