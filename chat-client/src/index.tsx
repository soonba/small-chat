import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import client from 'libs/apollo';
import { store } from 'libs/redux/store';

import App from 'app/App';

import 'styles/index.css';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
