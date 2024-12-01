import { Outlet, ScrollRestoration } from 'react-router-dom';

import { useGetMyInfo } from '@services/auth';

import Footer from './Footer';
import Gnb from './Gnb';

export default function BaseLayout() {
  useGetMyInfo();

  return (
    <div className="min-h-full w-full !bg-fixed bg-linear-gradient dark:bg-linear-gradient-dark">
      <Gnb />
      <main className="relative mx-auto w-full pt-14">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
