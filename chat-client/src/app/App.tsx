import { lazy, Suspense, useEffect, useRef } from 'react';
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
  const timeouts = useRef<NodeJS.Timeout[]>([]);

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
        const duration = Math.floor(Math.random() * (20 - 10)) + 10;
        const rotation = Math.floor(Math.random() * (360 - 45)) + 45;

        const className = theme === 'spring' ? 'cherry-blossom' : 'snowflake';
        image.classList.add(className);

        Object.assign(image.style, {
          width: `${size}px`,
          height: `${size}px`,
          opacity: `${opacity}`,
          rotate: `${rotation}deg`,
          position: 'absolute',
          left: `${Math.random() * window.innerWidth}px`,
          animation: `fall ${duration}s linear`,
          animationDelay: `${delay}s`,
        });
        body.appendChild(image);

        const timerId = setTimeout(
          () => {
            body.removeChild(image);
            handleAnimation();
          },
          (duration + delay) * 1500,
        );

        timeouts.current.push(timerId);
      };

      for (let i = 0; i < 1000; i++) {
        const timerId = setTimeout(handleAnimation, 100 * i);
        timeouts.current.push(timerId);
      }

      return () => {
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
        body.innerHTML = '';
      };
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
