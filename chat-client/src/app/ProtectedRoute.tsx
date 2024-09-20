import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { getTokens } from '@utils/storage';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { accessToken } = getTokens();

  if (!accessToken) {
    return <Navigate replace to="/login" />;
  }

  return <>{children}</>;
}
