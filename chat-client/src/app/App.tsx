import {createHashRouter, RouterProvider} from 'react-router-dom';

import {AuthLayout, BaseLayout} from 'layout';
import Chat from 'pages/Chat';
import ChatList from 'pages/ChatList';
import Login from 'pages/Login';
import Register from 'pages/Register';

import ProtectedRoute from './ProtectedRoute';

export default function App() {
    return (
        <RouterProvider
            router={createHashRouter([
                {
                    path: '/',
                    element: <BaseLayout/>,
                    children: [
                        {
                            index: true,
                            element: (
                                <ProtectedRoute>
                                    <ChatList/>
                                </ProtectedRoute>
                            )
                        },
                        {
                            path: 'chat/:id',
                            element: (
                                <ProtectedRoute>
                                    <Chat/>
                                </ProtectedRoute>
                            )
                        }
                    ]
                },
                {
                    path: '/login',
                    element: <AuthLayout/>,
                    children: [
                        {
                            index: true,
                            element: <Login/>
                        }
                    ]
                },
                {
                    path: '/register',
                    element: <AuthLayout/>,
                    children: [
                        {
                            index: true,
                            element: <Register/>
                        }
                    ]
                }
            ])}
        />
    );
}
