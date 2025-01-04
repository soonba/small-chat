import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '@app/App';

import { ToastProvider } from '@components/Toast';

import { store } from '@libs/redux';

import '@styles/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider position="bottom-center">
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
