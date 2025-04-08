import { Loader } from '@components/Loader';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Loader',
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
};
