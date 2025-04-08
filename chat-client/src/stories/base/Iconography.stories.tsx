import Iconography from './Iconography';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Iconography,
  parameters: {
    layout: 'centered',
  },
  title: 'Base/Iconography',
  decorators: (Story) => (
    <div className="!-m-10 h-full w-[calc(100%+80px)] !bg-gray-50 p-10">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Iconography>;

export default meta;
type Story = StoryObj<typeof Iconography>;

export const Default: Story = {
  args: {},
};
