import { ChangeEvent } from 'react';

import ChatRoomTitle from './ChatRoomTitle';
import ChatTextarea from './ChatTextarea';
import DefaultImage from './DefaultImage';
import MyChat from './MyChat';
import OpponentChat from './OpponentChat';

type ChatRoomType = {
    selected: string;
    onLeave: () => void;
    value: { sender: string; roomId: string; message: string };
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: () => void;
};

export default function ChatRoom({ selected, onLeave, value, onChange, onClick }: ChatRoomType) {
    return selected ? (
        <div className="relative mx-auto ml-96 w-full">
            <ChatRoomTitle onClick={onLeave} />
            <div className="mt-[106px] max-h-[calc(100vh-298px)] space-y-5 overflow-y-auto p-5">
                <OpponentChat />
                <MyChat />
            </div>
            <ChatTextarea value={value} onChange={onChange} onClick={onClick} />
        </div>
    ) : (
        <DefaultImage />
    );
}
