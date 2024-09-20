import { lazy } from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AuthLayout, BaseLayout, ChatLayout } from '@layouts/index';

import ProtectedRoute from './ProtectedRoute';

const Chat = lazy(() => import('@pages/Chat'));
const ChatList = lazy(() => import('@pages/ChatList'));
const Guide = lazy(() => import('@pages/Guide'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));

export default function App() {
  return (
    <RouterProvider
      router={createHashRouter(
        window.location.href.startsWith('https://')
          ? [
              {
                path: '/',
                children: [
                  {
                    index: true,
                    element: <Navigate replace to="/guide" />,
                  },
                  {
                    path: 'guide',
                    element: <Guide />,
                  },
                  {
                    path: '*',
                    element: <Guide />,
                  },
                ],
              },
            ]
          : [
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
            ],
      )}
    />
  );
}
