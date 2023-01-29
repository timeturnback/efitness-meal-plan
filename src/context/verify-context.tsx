import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { ForgotPasswordContext } from './forgot-password-context';

interface VerifyProps {
  countdown: number;
  setCountDown: Dispatch<SetStateAction<number>>;

  onReSend: () => void;
}

export const VerifyContext = createContext({} as VerifyProps);
export const VerifyProvider = ({ children }: { children: ReactNode }) => {
  const { setDataResetPassword, dataresetpassword } = useContext(
    ForgotPasswordContext
  );

  const [countdown, setCountDown] = useState(60);

  useEffect(() => {
    if (countdown !== 0) {
      setTimeout(() => {
        setCountDown(countdown - 1);
      }, 1000);
    }
  }, [countdown]);

  const onReSend = () => {
    setCountDown(60);
    setDataResetPassword({
      ...dataresetpassword,
      code: Number(`${Math.random()}`.substring(2, 8)),
    });
  };
  const value = {
    countdown,
    setCountDown,
    onReSend,
  };
  return (
    <VerifyContext.Provider value={value}>{children}</VerifyContext.Provider>
  );
};
