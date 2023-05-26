import 'firebase/compat/auth';

import firebase from 'firebase/compat/app';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

import { ImageHeader } from '@/components/images/header';

interface AuthStateChangedProps {
  useraccountinfo: {
    fullname: string;
    email: string;
    avatar: string;
    gender: string;
  };
  setUserAccountInfo: Dispatch<
    SetStateAction<{
      fullname: string;
      email: string;
      avatar: string;
      gender: string;
    }>
  >;

  onpublic: boolean | undefined;
  setOnPublic: Dispatch<SetStateAction<boolean | undefined>>;
}

export const AuthStateChangedContext = createContext(
  {} as AuthStateChangedProps
);

export const AuthStateChangedProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [useraccountinfo, setUserAccountInfo] = useState({
    fullname: '',
    email: '',
    avatar: '',
    gender: '',
  });

  const [onpublic, setOnPublic] = useState<boolean>();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        setUserAccountInfo({
          fullname: user.displayName || 'Unknown',
          email: user.email || '',
          avatar: user.photoURL || ImageHeader.User.src,
          gender: '',
        });
        setOnPublic(true);
      } else {
        setUserAccountInfo({
          fullname: '',
          email: '',
          avatar: '',
          gender: '',
        });
        setOnPublic(false);
      }
    });
  }, []);

  const value = {
    useraccountinfo,
    setUserAccountInfo,
    onpublic,
    setOnPublic,
  };

  return (
    <AuthStateChangedContext.Provider value={value}>
      {children}
    </AuthStateChangedContext.Provider>
  );
};
