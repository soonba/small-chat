import Color from './Color';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Color,
  parameters: {
    layout: 'centered',
  },
  title: 'Base/Color',
  decorators: (Story) => (
    <div className="!-m-10 h-full w-[calc(100%+80px)] !bg-gray-50 p-10">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Color>;

export default meta;
type Story = StoryObj<typeof Color>;

export const Default: Story = {
  args: {},
};
