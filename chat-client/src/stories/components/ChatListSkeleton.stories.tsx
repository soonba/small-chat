import { ChatListSkeleton } from '@components/ChatList';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ChatListSkeleton,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Chat/Skeleton',
  decorators: (Story) => (
    <div className="h-full min-h-inherit w-full">
      <Story />
    </div>
  ),
} satisfies Meta<typeof ChatListSkeleton>;

export default meta;
type Story = StoryObj<typeof ChatListSkeleton>;

export const Default: Story = {
  args: {},
};
