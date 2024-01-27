import { ChevronLeftIcon } from '@heroicons/react/20/solid';

type ChatRoomTitleType = {
    roomName: string;
    roomId: string;
    onClick: () => void;
};

export default function ChatRoomTitle({ roomName, roomId, onClick }: ChatRoomTitleType) {
    return (
        <div className="absolute inset-x-0 top-px z-10 flex h-[106px] w-full items-center gap-x-5 border-b-2 border-b-blue-gray-100 bg-white px-5">
            <button
                aria-label="뒤로가기"
                type="button"
                onClick={onClick}
                className="h-10 w-10 whitespace-nowrap rounded-md border border-blue-gray-900 text-xs font-bold text-blue-gray-900 hover:opacity-80"
            >
                <ChevronLeftIcon width={28} height={28} className="m-auto" />
            </button>
            <h2 className="text-2xl font-bold text-blue-gray-900">
                {roomName}({roomId})
            </h2>
        </div>
    );
}
