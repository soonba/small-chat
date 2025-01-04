import Register from './Register';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Register,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Auth/Register',
} satisfies Meta<typeof Register>;

export default meta;
type Story = StoryObj<typeof Register>;

export const Default: Story = {
  args: {},
};
