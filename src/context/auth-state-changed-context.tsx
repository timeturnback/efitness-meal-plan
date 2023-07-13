import 'firebase/compat/auth';

import type { User, UserCredential } from 'firebase/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useUpdatePassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from '@/components/firebase';
import { ImageHeader } from '@/components/Images/header';
import { ImagesUserProfile } from '@/components/Images/user-profile';
import { selector } from '@/redux';

interface Profile {
  displayName?: string;
  photoURL?: string;
}

interface AuthStateChangedProps {
  useraccountinfo: {
    fullname: string;
    email: string;
    avatar: string;
  };
  setUserAccountInfo: Dispatch<
    SetStateAction<{
      fullname: string;
      email: string;
      avatar: string;
    }>
  >;

  onpublic: boolean | undefined;
  setOnPublic: Dispatch<SetStateAction<boolean | undefined>>;

  gender: {
    value: string;
    image: string;
    image_header: string;
  };
  setGender: Dispatch<
    SetStateAction<{
      value: string;
      image: string;
      image_header: string;
    }>
  >;

  dateofbirth: string;
  setDateOfBirth: Dispatch<SetStateAction<string>>;

  createUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | undefined>;
  updateProfile: (profile: Profile) => Promise<boolean>;
  sendEmailVerification: () => Promise<boolean>;
  AuthService: {
    createUser: ({
      email,
      password,
      firstname,
      lastname,
    }: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    }) => Promise<User | undefined>;
    checkEmailUser: (email: string) => Promise<boolean>;
    logOut: () => void;
    resetPassword: (email: string) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<UserCredential>;
    sendAConfirmationEmail: () => Promise<void>;
    checkPassword: (email: string, password: string) => Promise<any>;
    updatePassword: (newpassword: string) => Promise<void>;
  };
  userInfo: User | null | undefined;
}

export const AuthStateChangedContext = createContext(
  {} as AuthStateChangedProps
);

export const AuthStateChangedProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [updatePassword] = useUpdatePassword(auth);
  const [userInfo] = useAuthState(auth);

  const [useraccountinfo, setUserAccountInfo] = useState({
    fullname: '',
    email: '',
    avatar: '',
  });

  const [onpublic, setOnPublic] = useState<boolean>();

  const [gender, setGender] = useState({
    value: '',
    image: '',
    image_header: '',
  });

  const [dateofbirth, setDateOfBirth] = useState('1/1/2000');

  const { users } = useSelector(selector.food);

  const dispatch = useDispatch();

  useEffect(() => {
    if (users.gender) {
      if (users.gender === 'male') {
        setGender({
          value: users.gender,
          image: ImagesUserProfile.IconMale.src,
          image_header: ImageHeader.MaleProfile.src,
        });
      } else if (users.gender === 'female') {
        setGender({
          value: users.gender,
          image: ImagesUserProfile.IconFemale.src,
          image_header: ImageHeader.FemaleProfile.src,
        });
      } else {
        setGender({
          value: users.gender,
          image: ImagesUserProfile.IconEquality.src,
          image_header: ImageHeader.User,
        });
      }
    } else {
      setGender({ value: 'Unknown', image: '', image_header: '' });
    }
  }, [users.gender]);

  useEffect(() => {
    if (users.date_of_birth) {
      setDateOfBirth(users.date_of_birth);
    } else {
      dispatch({
        type: 'infousers',
        payload: {
          date_of_birth: '1/1/2000',
        },
      });
    }
  }, [users.date_of_birth]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        setUserAccountInfo({
          fullname: user.displayName || 'Unknown',
          email: user.email || '',
          avatar: user.photoURL || ImageHeader.User.src,
        });
        setOnPublic(true);
      } else {
        setUserAccountInfo({
          fullname: '',
          email: '',
          avatar: '',
        });
        setOnPublic(false);
      }
    });
  }, [useraccountinfo]);

  const AuthService = {
    createUser: async ({
      email,
      password,
      firstname,
      lastname,
    }: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    }) => {
      const user = await createUserWithEmailAndPassword(email, password);
      await updateProfile({
        displayName: `${firstname} ${lastname}`,
        photoURL: ImageHeader.User.src,
      });
      await sendEmailVerification();
      return user?.user;
    },
    checkEmailUser: async (email: string) => {
      const value = await firebase.auth().fetchSignInMethodsForEmail(email);
      return value.length >= 1;
    },
    logOut: () => {
      signOut(auth);
    },
    resetPassword: async (email: string) => {
      await firebase.auth().sendPasswordResetEmail(email);
    },
    loginUser: async (email: string, password: string) => {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    },
    sendAConfirmationEmail: async () => {
      await firebase.auth().currentUser?.reload();
      await sendEmailVerification();
    },
    checkPassword: async (email: string, password: string) => {
      const response = await fetch('/api/check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      return data;
    },
    updatePassword: async (newpassword: string) => {
      await updatePassword(newpassword);
    },
  };

  const value = {
    useraccountinfo,
    setUserAccountInfo,
    onpublic,
    setOnPublic,
    gender,
    setGender,
    dateofbirth,
    setDateOfBirth,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    AuthService,
    userInfo,
  };

  return (
    <AuthStateChangedContext.Provider value={value}>
      {children}
    </AuthStateChangedContext.Provider>
  );
};
