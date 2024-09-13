import { Outlet, ScrollRestoration } from 'react-router-dom';

import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';

import { IconButton } from '@components/Button';

import { useMode } from '@hooks/utils';

export default function AuthLayout() {
  const { mode, onModeChange } = useMode();

  return (
    <div className="min-h-full w-full">
      <header className="fixed inset-x-0 top-0 z-10 bg-inherit">
        <div className="mx-auto flex h-14 w-full items-center justify-between rounded-b-md p-5">
          <div className="ml-auto flex items-center gap-5">
            <IconButton
              aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
              icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
              size="small"
              title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
              variant="text"
              onClick={onModeChange}
            />
          </div>
        </div>
      </header>
      <main className="size-full bg-primary-50/10 pb-48 pt-14 dark:bg-black/10">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
