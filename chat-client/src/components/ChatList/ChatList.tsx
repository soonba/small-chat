import { ReactElement } from 'react';

import ChatListEmpty from './ChatListEmpty';
import ChatListSkeleton from './ChatListSkeleton';

interface Props<T> {
  data: T[];
  emptyText: string;
  renderItem: (data: T, index: number) => ReactElement;
  isLoading: boolean;
}

export default function ChatList<T>({ data, emptyText, isLoading, renderItem }: Props<T>) {
  return isLoading ? (
    <ChatListSkeleton />
  ) : !data || data.length === 0 ? (
    <ChatListEmpty text={emptyText} />
  ) : (
    <ul className="mb-8 min-h-inherit space-y-2.5">{data.map((d, index) => renderItem(d, index))}</ul>
  );
}
