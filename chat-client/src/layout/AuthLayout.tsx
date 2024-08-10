import { Outlet, ScrollRestoration } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { IconButton } from 'components';

import { useMode } from 'hooks';

export default function AuthLayout() {
    const { mode, onModeChange } = useMode();

    return (
        <div className="min-h-full w-full">
            <header className="fixed left-0 right-0 top-0 z-10 bg-inherit">
                <div className="mx-auto flex h-14 w-full items-center justify-between rounded-b-md p-5">
                    <div className="ml-auto flex items-center gap-5">
                        <IconButton
                            aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
                            title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
                            variant="text"
                            size="small"
                            onClick={onModeChange}
                            icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
                        />
                    </div>
                </div>
            </header>
            <main className="h-full w-full bg-primary-50/10 pb-48 pt-14 dark:bg-black/10">
                <Outlet />
            </main>
            <ScrollRestoration />
        </div>
    );
}
