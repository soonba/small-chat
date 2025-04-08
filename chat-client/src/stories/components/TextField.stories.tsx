import TextField from '@components/TextField';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  decorators: (Story) => (
    <div className="w-full">
      <Story />
    </div>
  ),
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

export const DefaultTextField: Story = {
  args: {
    placeholder: '아이디를 입력하세요.',
  },
};

export const DisabledTextFiled: Story = {
  args: {
    disabled: true,
    defaultValue: '비활성화 상태입니다.',
  },
};
