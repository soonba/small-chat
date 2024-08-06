import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SocketProvider from 'context/SocketProvider';
import { store } from 'libs/redux/store';

import App from 'app/App';
import 'styles/index.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
