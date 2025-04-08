import Error from '@components/Error';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Error,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Error',
} satisfies Meta<typeof Error>;

export default meta;
type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {},
};
