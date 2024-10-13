import { lazy, Suspense } from 'react';
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
