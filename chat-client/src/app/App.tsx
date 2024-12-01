import { lazy, Suspense, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { Loader } from '@components/Loader';
import { AuthLayout, BaseLayout, ChatLayout } from '@layouts/index';

import ProtectedRoute from './ProtectedRoute';

const Chat = lazy(() => import('@pages/Chat'));
const ChatList = lazy(() => import('@pages/ChatList'));
const Guide = lazy(() => import('@pages/Guide'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));

export default function App() {
  useEffect(() => {
    const body = document.getElementById('snow');
    if (body) {
      const createSnowFlake = () => {
        const snowflake = document.createElement('div');

        const size = Math.floor(Math.random() * (20 - 10)) + 10;
        const opacity = Math.random();

        const delay = Math.random() * 10;
        const duration = Math.floor(Math.random() * (20 - 10) + 10);
        const rotation = Math.floor(Math.random() * (360 - 45)) + 45;

        snowflake.classList.add('snowflake');
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.opacity = `${opacity}`;

        snowflake.style.rotate = `${rotation}deg`;
        snowflake.style.left = `${Math.random() * window.innerWidth}px`;

        snowflake.style.animation = `fall ${duration}s linear`;
        snowflake.style.animationDelay = `${delay}s`;

        body.appendChild(snowflake);

        setTimeout(
          () => {
            body.removeChild(snowflake);
            createSnowFlake();
          },
          (duration + delay) * 1500,
        );
      };

      for (let i = 0; i < 50; i++) {
        setTimeout(createSnowFlake, 500 * i);
      }
    }
  }, []);

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-1000 flex cursor-progress items-center justify-center bg-black/30">
          <Loader />
        </div>
      }
    >
      <RouterProvider
        router={createHashRouter([
          {
            path: '/',
            element: <BaseLayout />,
            children: [
              {
                index: true,
                element: (
                  <ProtectedRoute>
                    <ChatList />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: '/chat',
            element: <ChatLayout />,
            children: [
              {
                path: ':id',
                element: (
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: '/login',
            element: <AuthLayout />,
            children: [
              {
                index: true,
                element: <Login />,
              },
            ],
          },
          {
            path: '/register',
            element: <AuthLayout />,
            children: [
              {
                index: true,
                element: <Register />,
              },
            ],
          },
          {
            path: '/guide',
            element: <Guide />,
          },
        ])}
      />
    </Suspense>
  );
}
