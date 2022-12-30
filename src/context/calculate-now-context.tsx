import { useRouter } from 'next/router';
import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react';
import { createContext, useState } from 'react';

import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CalculateNowProps {
  calculatenow: boolean;
  setCalculateNow: Dispatch<SetStateAction<boolean>>;
  pathname: string;
  leaves1: MutableRefObject<null>;
  leaves2: MutableRefObject<null>;
}

export const CalculateNowContext = createContext({} as CalculateNowProps);

export const CalculateNowProvider = ({ children }: { children: ReactNode }) => {
  const [calculatenow, setCalculateNow] = useState(true);
  const { pathname } = useRouter();
  const leaves1 = useScrollReveal({ origin: 'left' });
  const leaves2 = useScrollReveal({ origin: 'bottom' });
  const value = {
    calculatenow,
    setCalculateNow,
    pathname,
    leaves1,
    leaves2,
  };
  return (
    <CalculateNowContext.Provider value={value}>
      {children}
    </CalculateNowContext.Provider>
  );
};
