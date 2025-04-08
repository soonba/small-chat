import { Outlet, ScrollRestoration } from 'react-router-dom';

import { MoonIcon, PaintBrushIcon, SunIcon } from '@heroicons/react/20/solid';

import IconButton from '@components/IconButton';

import { useMode } from '@hooks/utils';

export default function AuthLayout() {
  const { mode, onModeChange, onThemeChange } = useMode();

  return (
    <div className="relative min-h-full w-full !bg-fixed spring:bg-pink-gradient winter:bg-blue-gradient spring:dark:bg-dark-pink-gradient winter:dark:bg-dark-blue-gradient">
      <header className="absolute inset-x-0 top-0 z-10 bg-inherit md:fixed">
        <div className="mx-auto flex h-14 w-full items-center justify-between rounded-b-md p-5">
          <div className="ml-auto flex items-center gap-5">
            <IconButton
              aria-label={`change to ${mode === 'light' ? 'dark' : 'light'} mode`}
              size="small"
              title={`${mode === 'light' ? '다크' : '라이트'} 모드로 변경하기`}
              variant="text"
              icon={mode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={onModeChange}
            />
            <IconButton
              aria-label="change theme"
              size="small"
              title="테마 변경하기"
              variant="text"
              icon={
                <PaintBrushIcon className="spring:text-blue-900 winter:text-pink-950 spring:dark:text-blue-100 winter:dark:text-pink-50" />
              }
              onClick={onThemeChange}
            />
          </div>
        </div>
      </header>
      <main className="flex size-full min-h-screen items-center justify-center py-14 md:pb-48 md:pt-28">
        <Outlet />
      </main>
      <ScrollRestoration />
    </div>
  );
}
