import { useEffect } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import { AuthLayout, BaseLayout, ChatLayout } from '@layouts/index';

import Chat from '@pages/Chat';
import ChatList from '@pages/ChatList';
import Guide from '@pages/Guide';
import Login from '@pages/Login';
import Register from '@pages/Register';

import ProtectedRoute from './ProtectedRoute';

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
  );
}
