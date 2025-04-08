import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Error from '@components/Error';

const ErrorElement = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setTimeout(() => {
      window.location.href = '/';
    }, 3000);

    return () => clearTimeout(timerId);
  }, [navigate]);

  return <Error />;
};

export default ErrorElement;
