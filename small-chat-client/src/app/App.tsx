import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Add from 'pages/Add';
import Chat from 'pages/Chat';
import Login from 'pages/Login';

import BaseLayout from '../layout/BaseLayout';

export default function App() {
    return (
        <RouterProvider
            router={createBrowserRouter([
                {
                    path: '/',
                    element: <BaseLayout />,
                    children: [
                        {
                            path: 'chat',
                            element: <Chat />
                        }
                    ]
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/add',
                    element: <Add />
                }
            ])}
        />
    );
}
