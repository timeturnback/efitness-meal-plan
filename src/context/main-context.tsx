import 'firebase/compat/auth';

import type firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

interface MainProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;

  calculatenow: boolean;
  setCalculateNow: Dispatch<SetStateAction<boolean>>;

  pathname: string;

  // leaves1: MutableRefObject<null>;
  // leaves2: MutableRefObject<null>;

  infocreateuser: firebase.auth.UserCredential | undefined;
  setInfoCreateUser: Dispatch<
    SetStateAction<firebase.auth.UserCredential | undefined>
  >;
}

export const MainContext = createContext({} as MainProps);

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [calculatenow, setCalculateNow] = useState(true);

  const { pathname } = useRouter();
  const router = useRouter();
  // const leaves1 = useScrollReveal({ origin: 'left' });
  // const leaves2 = useScrollReveal({ origin: 'bottom' });
  const [infocreateuser, setInfoCreateUser] =
    useState<firebase.auth.UserCredential>();

  useEffect(() => {
    if (sessionStorage.getItem('reloaded') !== null) {
      //
    }
    sessionStorage.setItem('reloaded', 'yes');
  }, []);

  useEffect(() => {
    const handlerStart = (url: any) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handlerComplete = (url: any) => {
      if (url === router.asPath) {
        setInterval(() => {
          setLoading(false);
        }, 800);
      }
    };
    router.events.on('routeChangeStart', handlerStart);
    router.events.on('routeChangeComplete', handlerComplete);
    return () => {
      router.events.off('routeChangeStart', handlerStart);
      router.events.off('routeChangeComplete', handlerComplete);
    };
  });

  const value = {
    loading,
    setLoading,
    calculatenow,
    setCalculateNow,
    pathname,
    // leaves1,
    // leaves2,
    infocreateuser,
    setInfoCreateUser,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
