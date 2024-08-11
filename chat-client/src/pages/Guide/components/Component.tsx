import {
    ArrowLeftEndOnRectangleIcon,
    ChatBubbleOvalLeftIcon,
    ClipboardIcon,
    EnvelopeIcon,
    FaceSmileIcon,
    MoonIcon,
    PaperAirplaneIcon,
    PlusIcon,
    SunIcon
} from '@heroicons/react/20/solid';
import { Button, IconButton, Loader, TextField } from 'components';

export default function Component() {
    return (
        <section id="component" className="scroll-m-16 text-primary-900 dark:text-primary-100">
            <div className="mb-10 flex items-center gap-x-2.5">
                <h2 className="text-30-B-36">Component</h2>
            </div>
            <div className="flex flex-wrap gap-10">
                <div className="flex flex-col self-start rounded bg-layout-light p-5 shadow-md shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                    <h3 className="mb-2.5 text-16-B-24 text-gray-900 dark:text-gray-100">Icon Button</h3>
                    <div className="flex items-center gap-x-2.5">
                        <IconButton
                            aria-label="change to light mode"
                            title="라이트 모드로 변경하기"
                            variant="text"
                            size="small"
                            icon={<MoonIcon />}
                        />
                        <IconButton
                            aria-label="change to dark mode"
                            title="다크 모드로 변경하기"
                            variant="text"
                            size="small"
                            icon={<SunIcon />}
                        />
                        <IconButton
                            aria-label="leave chat"
                            title="채팅방 나가기"
                            variant="text"
                            size="small"
                            icon={<ArrowLeftEndOnRectangleIcon />}
                        />
                        <IconButton
                            aria-label="open emoji picker"
                            title="이모티콘 보기"
                            variant="text"
                            size="small"
                            icon={<FaceSmileIcon />}
                        />
                        <IconButton
                            aria-label="copy chat id"
                            title="코드 공유하기"
                            variant="text"
                            size="small"
                            icon={<ClipboardIcon />}
                        />
                        <IconButton
                            aria-label="send message"
                            title="메시지 보내기"
                            variant="text"
                            size="small"
                            icon={<PaperAirplaneIcon />}
                        />
                        <IconButton
                            type="button"
                            aria-label="chat list"
                            title="참여중인 채팅 리스트"
                            variant="outlined"
                            size="medium"
                            icon={<ChatBubbleOvalLeftIcon />}
                        />
                        <IconButton
                            type="button"
                            aria-label="join chat"
                            title="채팅 참여하기"
                            variant="outlined"
                            size="medium"
                            icon={<EnvelopeIcon />}
                        />
                        <IconButton
                            type="button"
                            variant="contained"
                            size="large"
                            aria-label="create chat"
                            title="채팅 생성하기"
                            icon={<PlusIcon />}
                        />
                    </div>
                </div>
                <div className="min-w-96 max-w-lg flex-1 flex-col rounded bg-layout-light p-5 shadow-md shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                    <h3 className="mb-2.5 text-16-B-24 text-gray-900 dark:text-gray-100">Button</h3>
                    <div className="flex w-full flex-col items-start gap-y-2.5">
                        <Button text="로그아웃" variant="text" size="small" />
                        <Button text="참여하기" type="submit" variant="contained" size="medium" />
                        <Button text="생성하기" disabled type="submit" variant="contained" size="medium" />
                        <Button type="submit" text="로그인" variant="contained" size="large" />
                        <Button type="button" text="회원가입" variant="outlined" size="large" />
                    </div>
                </div>
                <div className="flex min-w-80 flex-1 flex-col self-start rounded bg-layout-light p-5 shadow-md shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                    <h3 className="mb-2.5 text-16-B-24 text-gray-900 dark:text-gray-100">TextField</h3>
                    <div className="flex flex-col gap-y-2.5">
                        <TextField placeholder="안녕하세요." />
                        <TextField disabled defaultValue="비활성화 상태입니다." />
                    </div>
                </div>
                <div className="flex min-w-80 flex-1 flex-col self-start rounded bg-layout-light p-5 shadow-md shadow-primary-100 dark:bg-layout-dark dark:shadow-primary-950">
                    <h3 className="mb-2.5 text-16-B-24 text-gray-900 dark:text-gray-100">Loader</h3>
                    <div className="flex h-80 items-center justify-center">
                        <Loader />
                    </div>
                </div>
            </div>
        </section>
    );
}
