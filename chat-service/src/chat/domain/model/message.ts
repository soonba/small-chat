export type MessageEventType = {
  chatId: string;
  userId: string;
  nickname: string;
  message: string;
  sentAt?: number;
  type?: 'SYSTEM' | 'USER';
};
