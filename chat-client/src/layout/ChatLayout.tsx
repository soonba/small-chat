import { Outlet } from 'react-router-dom';

import { useGetMyInfo } from 'services/auth';

export default function ChatLayout() {
    useGetMyInfo();

    return (
        <div className="min-h-full w-full bg-primary-50/10 dark:bg-black/10">
            <Outlet />
        </div>
    );
}
