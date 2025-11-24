import { useEffect, useState } from 'react';

import { ChatList, ChatListItem } from '@components/ChatList';

import { sleep } from '../utils/common';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: ChatList,
  parameters: { layout: 'fullscreen' },
  title: 'Components/Chat/List',
  render: function Render() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      sleep(3000).then(() => setIsLoading(false));
    }, []);

    return (
      <div className="h-full min-h-inherit w-full">
        <ChatList
          emptyText="채팅에 참여해 보세요."
          renderItem={(data) => <ChatListItem key={data.chatId} {...data} />}
          isLoading={isLoading}
          data={Array.from({ length: 5 }, (_, index) => ({
            chatId: String(index),
            chatName: '작은대화' + (index + 1),
            lastMessage: '안녕하세요~~~!',
            lastSentAt: new Date().toDateString(),
          }))}
        />
      </div>
    );
  },
} satisfies Meta<typeof ChatList>;

export default meta;
type Story = StoryObj<typeof ChatList>;

export const Default: Story = { args: {} };
