import { Outlet, ScrollRestoration } from 'react-router-dom';

import { useGetMyInfo } from '@services/auth';

import Footer from './Footer';
import Gnb from './Gnb';

export default function BaseLayout() {
  useGetMyInfo();

  return (
    <div className="min-h-full w-full">
      <Gnb />
      <main className="relative mx-auto w-full bg-primary-50/10 pt-14 dark:bg-black/10">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
