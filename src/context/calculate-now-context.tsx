import { useRouter } from 'next/router';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface CalculateNowProps {
  calculatenow: boolean;
  setCalculateNow: Dispatch<SetStateAction<boolean>>;
  pathname: string;
}

export const CalculateNowContext = createContext({} as CalculateNowProps);

export const CalculateNowProvider = ({ children }: { children: ReactNode }) => {
  const [calculatenow, setCalculateNow] = useState(true);
  const { pathname } = useRouter();
  const value = {
    calculatenow,
    setCalculateNow,
    pathname,
  };
  return (
    <CalculateNowContext.Provider value={value}>
      {children}
    </CalculateNowContext.Provider>
  );
};
