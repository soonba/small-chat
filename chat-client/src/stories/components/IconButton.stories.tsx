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

import IconButton from '@components/IconButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/IconButton',
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const ChangeToLightModeIconButton: Story = {
  args: {
    'aria-label': 'change to light mode',
    size: 'small',
    title: '라이트 모드로 변경하기',
    variant: 'text',
    icon: <MoonIcon />,
  },
};

export const ChangeToDarkModeIconButton: Story = {
  args: {
    'aria-label': 'change to dark mode',
    size: 'small',
    title: '다크 모드로 변경하기',
    variant: 'text',
    icon: <SunIcon />,
  },
};

export const LeaveChatIconButton: Story = {
  args: {
    'aria-label': 'leave chat',
    size: 'small',
    title: '채팅방 나가기',
    variant: 'text',
    icon: <ArrowLeftEndOnRectangleIcon />,
  },
};

export const OpenEmojiPickerIconButton: Story = {
  args: {
    'aria-label': 'open emoji picker',
    size: 'small',
    title: '이모티콘 보기',
    variant: 'text',
    icon: <FaceSmileIcon />,
  },
};

export const CopyChatIdIconButton: Story = {
  args: {
    'aria-label': 'copy chat id',
    size: 'small',
    title: '초대 코드 공유하기',
    variant: 'text',
    icon: <ClipboardIcon />,
  },
};

export const SendMessageIconButton: Story = {
  args: {
    'aria-label': 'send message',
    size: 'small',
    title: '메시지 보내기',
    variant: 'text',
    icon: <PaperAirplaneIcon />,
  },
};

export const ShowChatListIconButton: Story = {
  args: {
    'aria-label': 'show chat list',
    size: 'medium',
    title: '참여중인 채팅 리스트 보기',
    variant: 'outlined',
    icon: <ChatBubbleOvalLeftIcon />,
  },
};

export const JoinChatIconButton: Story = {
  args: {
    'aria-label': 'join chat',
    size: 'medium',
    title: '채팅 참여하기',
    variant: 'outlined',
    icon: <EnvelopeIcon />,
  },
};

export const CreateChatIconButton: Story = {
  args: {
    'aria-label': 'create chat',
    size: 'medium',
    title: '채팅 생성하기',
    variant: 'outlined',
    icon: <PlusIcon />,
  },
};
