import { MessageType } from './ChatRoom';

type OpponentChatType = {
    data: MessageType;
};
export default function OpponentChat({ data }: OpponentChatType) {
    return (
        <div className="mr-auto w-max">
            <div className="flex items-center gap-x-2.5">
                <img src="https://picsum.photos/40" width={40} height={40} alt="" className="h-10 w-10 rounded-lg border border-blue-gray-100" />
                <p className="text-sm font-bold">{data.sender}</p>
            </div>
            <div className="flex items-end gap-x-2.5">
                <div className="ml-[50px] min-w-80 max-w-md whitespace-pre-wrap break-all rounded-3xl rounded-tl-none bg-blue-gray-50 p-5 text-sm">{data.message}</div>
                <time className="text-xs font-semibold">11:01</time>
            </div>
        </div>
    );
}
