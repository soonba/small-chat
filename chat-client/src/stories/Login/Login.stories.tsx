import Login from './Login';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Login,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Auth/Login',
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {
  args: {},
};
