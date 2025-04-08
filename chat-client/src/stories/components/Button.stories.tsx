import Button from '@components/Button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Button,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const LoginButton: Story = {
  args: {
    size: 'large',
    variant: 'contained',
    text: '로그인',
  },
};

export const RegisterButton: Story = {
  args: {
    size: 'large',
    variant: 'outlined',
    text: '회원가입',
  },
};

export const CreateChatButton: Story = {
  args: {
    size: 'medium',
    variant: 'contained',
    text: '생성하기',
  },
};

export const ParticipateChatButton: Story = {
  args: {
    size: 'medium',
    variant: 'contained',
    text: '참여하기',
  },
};

export const LogoutButton: Story = {
  args: {
    size: 'small',
    variant: 'text',
    text: '로그아웃',
  },
};
