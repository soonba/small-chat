import { getFormatDate } from 'libs/utils/date';

type ChatListItemType = {
    room: {
        roomId: string;
        lastMessage: string;
        lastMessageTime: string;
        lastMessageSenderNickname: string;
        roomName: string;
        unReadMassageCount: number;
    };
    onClick: (id: string, roomName: string) => void;
};

export default function ChatListItem({ room, onClick }: ChatListItemType) {
    const { roomId, unReadMassageCount, roomName, lastMessageSenderNickname, lastMessage, lastMessageTime } = room;
    return (
        <li className="group rounded-md border border-blue-gray-100 bg-white p-2.5 hover:bg-blue-gray-50/50">
            <button type="button" className="block h-full w-full" onClick={() => onClick(roomId, roomName)}>
                <div className="flex items-center gap-x-2">
                    <div className="relative flex-none">
                        <img src="https://picsum.photos/56" alt="" width={56} height={56} className="h-14 w-14 rounded-lg border border-blue-gray-100" />
                        <small className="font-blue-gray-900 absolute -bottom-1.5 -right-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-blue-gray-50 text-[9px] font-semibold text-blue-gray-900">
                            <strong>+{unReadMassageCount}</strong>
                        </small>
                    </div>
                    <div className="relative h-14 w-full">
                        <div className="my-1 flex w-full items-start justify-between">
                            <p className="w-full truncate text-base font-bold group-hover:text-blue-gray-300">{roomName}</p>
                            <time className="whitespace-nowrap text-[10px] font-bold">{getFormatDate(lastMessageTime, 'YYYY-MM-DD HH:MM')}</time>
                        </div>
                        <p className="mt-3 w-52 truncate text-xs">
                            <strong>
                                {lastMessageSenderNickname} : {lastMessage}
                            </strong>
                        </p>
                        <span className="font-blue-gray-900 absolute bottom-0 right-0 flex min-h-4 min-w-4 items-center justify-center text-[13px] font-semibold text-black">입장하기</span>
                    </div>
                </div>
            </button>
        </li>
    );
}
