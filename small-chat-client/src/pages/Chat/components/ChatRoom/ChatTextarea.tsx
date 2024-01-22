import { ChangeEvent } from 'react';

type ChatTextareaType = {
    value: { sender: string; roomId: string; message: string };
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClick: () => void;
};

export default function ChatTextarea({ value, onChange, onClick }: ChatTextareaType) {
    return (
        <div className="absolute -right-5 bottom-0 left-0 z-10 flex h-32 w-full items-center border-t-2 border-t-blue-gray-100 bg-white p-5">
            <textarea value={value.message} onChange={onChange} className="h-full w-full resize-none rounded-t-md bg-blue-gray-50/50 p-5 pb-0 text-base outline-none ring-0" />
            <button type="button" onClick={onClick} className="h-full w-20 whitespace-nowrap rounded-md bg-blue-gray-900 text-xl font-bold text-white hover:opacity-80">
                전송
            </button>
        </div>
    );
}
