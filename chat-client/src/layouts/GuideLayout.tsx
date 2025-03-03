import { Outlet } from 'react-router-dom';

import GuideGnb from './GuideGnb';

const GuideLayout = () => {
  return (
    <div className="min-h-full w-full !bg-fixed bg-linear-gradient dark:bg-linear-gradient-dark">
      <GuideGnb />
      <main className="min-h-screen w-full p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default GuideLayout;
