import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import BaseLayout from 'layout/BaseLayout';

import Chat from 'pages/Chat';
import Login from 'pages/Login';

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
                }
            ])}
        />
    );
}
