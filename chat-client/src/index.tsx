import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ToastProvider } from 'components/Toast/ToastProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from 'libs/redux/store';
import SocketProvider from 'libs/socket/SocketProvider';

import App from 'app/App';

import 'styles/index.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    <ToastProvider position="top-center">
                        <App />
                    </ToastProvider>
                </SocketProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
