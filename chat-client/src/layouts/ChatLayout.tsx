import { Outlet } from 'react-router-dom';

import { useGetMyInfo } from '@services/auth';

export default function ChatLayout() {
  useGetMyInfo();

  return (
    <div className="min-h-full w-full !bg-fixed bg-linear-gradient dark:bg-linear-gradient-dark">
      <Outlet />
    </div>
  );
}
