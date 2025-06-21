import MessageList from './MessageList';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MessageList,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Message/List',
} satisfies Meta<typeof MessageList>;

export default meta;
type Story = StoryObj<typeof MessageList>;

export const Default: Story = {
  args: {},
};
