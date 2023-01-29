import 'firebase/compat/auth';

import firebase from 'firebase/compat/app';
import { useRouter } from 'next/router';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

interface MainProps {
  onpublic: boolean;
  setOnPublic: Dispatch<SetStateAction<boolean>>;

  accountinfor: {
    fullname: string;
    email: string;
    password: string;
    avatar: string;
    gender: string;
  };
  setAccountInfor: Dispatch<
    SetStateAction<{
      fullname: string;
      email: string;
      password: string;
      avatar: string;
      gender: string;
    }>
  >;

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
  const [onpublic, setOnPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [calculatenow, setCalculateNow] = useState(true);

  const { pathname } = useRouter();
  const router = useRouter();
  // const leaves1 = useScrollReveal({ origin: 'left' });
  // const leaves2 = useScrollReveal({ origin: 'bottom' });
  const [infocreateuser, setInfoCreateUser] =
    useState<firebase.auth.UserCredential>();

  const [accountinfor, setAccountInfor] = useState({
    fullname: '',
    email: '',
    password: '',
    avatar: '',
    gender: '',
  });

  const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    // ...
  };
  firebase.initializeApp(config);

  // useEffect(() => {
  //   const unregisterAuthObserver = firebase
  //     .auth()
  //     .onAuthStateChanged((user) => {
  //       if (!user) {
  //         setOnPublic(false);
  //       } else {
  //         setAccountInfor({
  //           fullname: user.displayName || 'Unkown Username',
  //           email: user.email || 'Unkown User Email',
  //           avatar: user.photoURL || ImageHeader.User.src,
  //           password: '',
  //           gender: '',
  //         });
  //       }
  //     });
  //   return () => unregisterAuthObserver();
  // }, []);

  useEffect(() => {
    const handlerStart = (url: any) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handlerComplete = (url: any) => {
      if (url === router.asPath) {
        setTimeout(() => {
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
    onpublic,
    setOnPublic,
    accountinfor,
    setAccountInfor,
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
