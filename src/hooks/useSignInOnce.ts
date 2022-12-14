import { useRef } from 'react';

export const useSignInOnce = (handler: () => void) => {
  const shouldLog = useRef(true);
  if (shouldLog.current) {
    shouldLog.current = false;
    handler();
  }
};
