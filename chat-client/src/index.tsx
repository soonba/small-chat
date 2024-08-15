import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ToastProvider } from 'components/Toast/ToastProvider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from 'libs/redux/store';

import App from 'app/App';

import 'styles/index.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ToastProvider position="bottom-center">
                    <App />
                </ToastProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
