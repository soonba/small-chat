import { MessageListSkeleton } from '@components/MessageList';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MessageListSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Message/Skeleton',
} satisfies Meta<typeof MessageListSkeleton>;

export default meta;
type Story = StoryObj<typeof MessageListSkeleton>;

export const Default: Story = {
  args: {},
};
