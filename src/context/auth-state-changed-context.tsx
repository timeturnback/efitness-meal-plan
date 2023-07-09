import 'firebase/compat/auth';

import firebase from 'firebase/compat/app';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ImageHeader } from '@/components/Images/header';
import { ImagesUserProfile } from '@/components/Images/user-profile';
import { selector } from '@/redux';

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

  const value = {
    useraccountinfo,
    setUserAccountInfo,
    onpublic,
    setOnPublic,
    gender,
    setGender,
    dateofbirth,
    setDateOfBirth,
  };

  return (
    <AuthStateChangedContext.Provider value={value}>
      {children}
    </AuthStateChangedContext.Provider>
  );
};
