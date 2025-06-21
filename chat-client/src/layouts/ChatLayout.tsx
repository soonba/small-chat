import { Outlet } from 'react-router-dom';

import { useGetMyInfo } from '@services/auth';

export default function ChatLayout() {
  useGetMyInfo();

  return (
    <div className="min-h-full w-full !bg-fixed spring:bg-pink-gradient winter:bg-blue-gradient dark:spring:bg-dark-pink-gradient dark:winter:bg-dark-blue-gradient">
      <Outlet />
    </div>
  );
}
