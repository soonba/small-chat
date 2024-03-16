import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Add from 'pages/Add';
import Login from 'pages/Login';

import BaseLayout from '../layout/BaseLayout';
import Chat from '../pages/Chat';
import Join from '../pages/Join/Join';

export default function App() {
    return (
        <RouterProvider
            router={createBrowserRouter([
                {
                    path: '/',
                    element: <Login />
                },
                {
                    path: '/chat',
                    element: <BaseLayout />,
                    children: [
                        {
                            path: '',
                            element: <Chat />
                        }
                    ]
                },
                {
                    path: '/add',
                    element: <Add />
                },
                {
                    path: '/join',
                    element: <Join />
                }
            ])}
        />
    );
}
