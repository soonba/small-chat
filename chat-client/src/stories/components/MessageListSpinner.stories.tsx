import { MessageListSpinner } from '@components/MessageList';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: MessageListSpinner,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Message/Spinner',
} satisfies Meta<typeof MessageListSpinner>;

export default meta;
type Story = StoryObj<typeof MessageListSpinner>;

export const Default: Story = {
  args: {},
};
