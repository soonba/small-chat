import Typography from './Typography';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  title: 'Base/Typography',
  decorators: (Story) => (
    <div className="!-m-10 h-full w-[calc(100%+80px)] !bg-gray-50 p-10">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {},
};
