import { lazy, Suspense, useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout, BaseLayout, ChatLayout } from '@layouts/index';

const Login = lazy(() => import('@pages/Login/Login'));
const Register = lazy(() => import('@pages/Register/Register'));
const ChatList = lazy(() => import('@pages/ChatList/ChatList'));
const Chat = lazy(() => import('@pages/Chat/Chat'));

import Fallback from '@components/Fallback';

import { getStorageItem, SESSION_STORAGE_KEYS } from '@utils/storage';

import ErrorElement from './ErrorElement';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
  useEffect(() => {
    const body = document.getElementById('animation');
    const theme =
      document.documentElement.getAttribute('data-theme') || getStorageItem(SESSION_STORAGE_KEYS.THEME) || 'spring';

    if (body) {
      const handleAnimation = () => {
        const image = document.createElement('div');

        const size = Math.floor(Math.random() * (30 - 10)) + 10;
        const opacity = Math.random();

        const delay = Math.random() * 10;
        const duration = Math.floor(Math.random() * (20 - 10) + 10);
        const rotation = Math.floor(Math.random() * (360 - 45)) + 45;

        if (theme === 'spring') {
          image.classList.add('cherry-blossom');
        } else if (theme === 'winter') {
          image.classList.add('snowflake');
        }

        image.style.width = `${size}px`;
        image.style.height = `${size}px`;
        image.style.opacity = `${opacity}`;

        image.style.rotate = `${rotation}deg`;
        image.style.position = 'absolute';
        image.style.left = `${Math.random() * window.innerWidth}px`;

        image.style.animation = `fall ${duration}s linear`;
        image.style.animationDelay = `${delay}s`;

        body.appendChild(image);

        setTimeout(
          () => {
            body.removeChild(image);
            handleAnimation();
          },
          (duration + delay) * 1500,
        );
      };

      for (let i = 0; i < 1000; i++) {
        setTimeout(handleAnimation, 500 * i);
      }
    }
  }, []);

  return (
    <RouterProvider
      router={createHashRouter([
        {
          path: '/',
          element: <BaseLayout />,
          errorElement: <ErrorElement />,
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute>
                  <Suspense fallback={<Fallback />}>
                    <ChatList />
                  </Suspense>
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
                  <Suspense fallback={<Fallback />}>
                    <Chat />
                  </Suspense>
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
              element: (
                <Suspense fallback={<Fallback />}>
                  <Login />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: '/register',
          element: <AuthLayout />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<Fallback />}>
                  <Register />
                </Suspense>
              ),
            },
          ],
        },
      ])}
    />
  );
}
