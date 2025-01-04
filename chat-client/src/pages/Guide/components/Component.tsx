import {
  ArrowLeftEndOnRectangleIcon,
  ChatBubbleOvalLeftIcon,
  ClipboardIcon,
  EnvelopeIcon,
  FaceSmileIcon,
  MoonIcon,
  PaperAirplaneIcon,
  PlusIcon,
  SunIcon,
} from '@heroicons/react/20/solid';

import Button from '@components/Button';
import IconButton from '@components/IconButton';
import Loader from '@components/Loader';
import TextField from '@components/TextField';

export default function Component() {
  return (
    <section className="scroll-m-16" id="component">
      <h2
        className="mb-10 text-30-B-36 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:[text-shadow:unset]"
        id="component"
      >
        Component
      </h2>
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col self-start rounded bg-transparent p-5">
          <h3 className="mb-2.5 text-16-B-24 text-gray-50 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:text-gray-100 dark:[text-shadow:unset]">
            Icon Button
          </h3>
          <div className="flex items-center gap-x-2.5">
            <IconButton
              aria-label="change to light mode"
              size="small"
              title="라이트 모드로 변경하기"
              variant="text"
              icon={<MoonIcon />}
            />
            <IconButton
              aria-label="change to dark mode"
              size="small"
              title="다크 모드로 변경하기"
              variant="text"
              icon={<SunIcon />}
            />
            <IconButton
              aria-label="leave chat"
              size="small"
              title="채팅방 나가기"
              variant="text"
              icon={<ArrowLeftEndOnRectangleIcon />}
            />
            <IconButton
              aria-label="open emoji picker"
              size="small"
              title="이모티콘 보기"
              variant="text"
              icon={<FaceSmileIcon />}
            />
            <IconButton
              aria-label="copy chat id"
              size="small"
              title="코드 공유하기"
              variant="text"
              icon={<ClipboardIcon />}
            />
            <IconButton
              aria-label="send message"
              size="small"
              title="메시지 보내기"
              variant="text"
              icon={<PaperAirplaneIcon />}
            />
            <IconButton
              aria-label="chat list"
              size="medium"
              title="참여중인 채팅 리스트"
              type="button"
              variant="outlined"
              icon={<ChatBubbleOvalLeftIcon />}
            />
            <IconButton
              aria-label="join chat"
              size="medium"
              title="채팅 참여하기"
              type="button"
              variant="outlined"
              icon={<EnvelopeIcon />}
            />
            <IconButton
              aria-label="create chat"
              size="large"
              title="채팅 생성하기"
              type="button"
              variant="contained"
              icon={<PlusIcon />}
            />
          </div>
        </div>
        <div className="min-w-96 max-w-lg flex-1 flex-col rounded bg-transparent p-5">
          <h3 className="mb-2.5 text-16-B-24 text-gray-50 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:text-gray-100 dark:[text-shadow:unset]">
            Button
          </h3>
          <div className="flex w-full flex-col items-start gap-y-2.5">
            <Button size="small" text="로그아웃" variant="text" />
            <Button size="medium" text="참여하기" type="submit" variant="contained" />
            <Button disabled size="medium" text="생성하기" type="submit" variant="contained" />
            <Button size="large" text="로그인" type="submit" variant="contained" />
            <Button size="large" text="회원가입" type="button" variant="outlined" />
          </div>
        </div>
        <div className="flex min-w-80 flex-1 flex-col self-start rounded bg-transparent p-5">
          <h3 className="mb-2.5 text-16-B-24 text-gray-50 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:text-gray-100 dark:[text-shadow:unset]">
            TextField
          </h3>
          <div className="flex flex-col gap-y-2.5">
            <TextField placeholder="안녕하세요." />
            <TextField disabled defaultValue="비활성화 상태입니다." />
          </div>
        </div>
        <div className="flex min-w-80 flex-1 flex-col self-start rounded bg-transparent p-5">
          <h3 className="mb-2.5 text-16-B-24 text-gray-50 drop-shadow-lg [text-shadow:0_0_2px_#0c436e] dark:text-gray-100 dark:[text-shadow:unset]">
            Loader
          </h3>
          <div className="flex h-80 items-center justify-center">
            <Loader />
          </div>
        </div>
      </div>
    </section>
  );
}
