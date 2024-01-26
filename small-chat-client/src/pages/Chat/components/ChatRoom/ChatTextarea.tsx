import { ChangeEvent, useCallback, useState } from 'react';

import { useSendMutation } from '../../../../generated/graphql';

type ChatTextareaType = {
    roomId: string;
};
export default function ChatTextarea({ roomId }: ChatTextareaType) {
    const [inputMessage, setInputMessage] = useState('');

    const [sendMutation] = useSendMutation();
    const userId = localStorage.getItem('userId') || '';

    const handleSubmit = useCallback(() => {
        if (inputMessage) {
            sendMutation({ variables: { input: { roomId, userId, message: inputMessage } } });
            setInputMessage('');
        }
    }, [inputMessage, roomId, sendMutation, userId]);

    // 사용자 입력메시지
    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.currentTarget.value);
    }, []);
    return (
        <div className="absolute -right-5 bottom-0 left-0 z-10 flex h-32 w-full items-center border-t-2 border-t-blue-gray-100 bg-white p-5">
            <textarea value={inputMessage} onChange={handleChange} className="h-full w-full resize-none rounded-t-md bg-blue-gray-50/50 p-5 pb-0 text-base outline-none ring-0" />
            <button type="button" onClick={handleSubmit} className="h-full w-20 whitespace-nowrap rounded-md bg-blue-gray-900 text-xl font-bold text-white hover:opacity-80">
                전송
            </button>
        </div>
    );
}
