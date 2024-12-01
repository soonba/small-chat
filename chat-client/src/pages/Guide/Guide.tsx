import { useEffect, useRef } from 'react';

import { GuideGnb } from '@layouts/index';

import { Chat, Color, Component, Iconography, Typography } from './components';

export default function Guide() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const intersectedId = entry.target.innerHTML;
            const header = document.getElementById('gnb');
            const listItem = header?.getElementsByTagName('li') || [];
            [...listItem].forEach((element) => {
              const button = element.firstChild as HTMLElement;
              if (element.id.replace(/gnb-/gi, '') === intersectedId.toLowerCase()) {
                button.style.setProperty('font-weight', '900');
                button.style.setProperty('text-decoration', 'underline');
              } else {
                button.style.removeProperty('font-weight');
                button.style.removeProperty('text-decoration');
              }
            });
          }
        }
      },
      { threshold: 0 },
    );

    if (ref.current) {
      const children = ref.current.getElementsByTagName('h2');
      [...children].forEach((child) => {
        io.observe(child as Element);
      });
    }

    return () => {
      if (ref.current) {
        const children = ref.current.getElementsByTagName('h2');
        [...children].forEach((child) => {
          io.unobserve(child as Element);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-full w-full min-w-laptop !bg-fixed bg-linear-gradient dark:bg-linear-gradient-dark">
      <GuideGnb />
      <main className="min-h-screen w-full p-5">
        <div ref={ref} className="space-y-10 text-white dark:text-primary-100">
          <Typography />
          <Color />
          <Iconography />
          <Component />
          <Chat />
        </div>
      </main>
    </div>
  );
}
