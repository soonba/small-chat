import { BeginChatImage } from 'assets/images';

export default function DefaultImage() {
    return (
        <div className="relative mx-auto ml-96 flex w-full flex-col items-center justify-center">
            <img src={BeginChatImage} alt="" width={400} height={400} className="mb-10" />
            <p className="text-2xl font-bold">채팅 목록에서 채팅을 선택해 주세요.😊</p>
        </div>
    );
}
