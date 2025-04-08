import Fallback from '@components/Fallback';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Fallback,
  parameters: {
    layout: 'centered',
  },
  title: 'Components/Fallback',
} satisfies Meta<typeof Fallback>;

export default meta;
type Story = StoryObj<typeof Fallback>;

export const Default: Story = {
  args: {},
};
