import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from '@app/App';

import { ToastProvider } from '@components/Toast';

import '@styles/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider position="bottom-center">
        <App />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);
