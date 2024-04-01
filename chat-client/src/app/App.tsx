import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BaseLayout from 'layout/BaseLayout';

import AddRoom from 'pages/AddRoom';
import Chat from 'pages/Chat';
import JoinRoom from 'pages/JoinRoom/JoinRoom';
import Login from 'pages/Login';
import Signup from 'pages/Signup';

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
                    element: <AddRoom />
                },
                {
                    path: '/join',
                    element: <JoinRoom />
                },
                {
                    path: '/signup',
                    element: <Signup />
                }
            ])}
        />
    );
}
