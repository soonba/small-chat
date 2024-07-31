import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from 'layout';
import Chat from 'pages/Chat';
import ChatList from 'pages/ChatList';
import Login from 'pages/Login';
import Register from 'pages/Register';

import ProtectedRoute from './ProtectedRoute';

export default function App() {
    return (
        <RouterProvider
            router={createBrowserRouter([
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
                        },
                        {
                            path: 'login',
                            element: <Login />
                        },
                        {
                            path: 'register',
                            element: <Register />
                        },
                        {
                            path: 'chat/:id',
                            element: (
                                <ProtectedRoute>
                                    <Chat />
                                </ProtectedRoute>
                            )
                        }
                    ]
                }
            ])}
        />
    );
}
