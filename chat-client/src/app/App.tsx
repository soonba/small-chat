import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AuthLayout, BaseLayout, ChatLayout } from 'layout';

import Chat from 'pages/Chat';
import ChatList from 'pages/ChatList';
import Guide from 'pages/Guide';
import Login from 'pages/Login';
import Register from 'pages/Register';

import ProtectedRoute from './ProtectedRoute';

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
                                      element: <Navigate to="/guide" replace />
                                  },
                                  {
                                      path: 'guide',
                                      element: <Guide />
                                  },
                                  {
                                      path: '*',
                                      element: <Guide />
                                  }
                              ]
                          }
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
                                      )
                                  }
                              ]
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
                                      )
                                  }
                              ]
                          },
                          {
                              path: '/login',
                              element: <AuthLayout />,
                              children: [
                                  {
                                      index: true,
                                      element: <Login />
                                  }
                              ]
                          },
                          {
                              path: '/register',
                              element: <AuthLayout />,
                              children: [
                                  {
                                      index: true,
                                      element: <Register />
                                  }
                              ]
                          },
                          {
                              path: '/guide',
                              element: <Guide />
                          }
                      ]
            )}
        />
    );
}
