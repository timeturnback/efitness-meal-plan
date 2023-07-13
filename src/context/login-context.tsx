import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

import type { SelectOptionLoginNotice } from '@/constants/select-options';
import { LOGIN_NOTICES } from '@/constants/select-options';

import { AuthStateChangedContext } from './auth-state-changed-context';

interface LoginProps {
  email: {
    value: string;
    error: string;
  };
  setEmail: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  password: {
    value: string;
    error: string;
  };
  setPassword: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  onSubmit: () => Promise<void>;
  userlogin: {
    status: boolean;
    user: SelectOptionLoginNotice;
  };
  setUserLogin: Dispatch<
    SetStateAction<{
      status: boolean;
      user: SelectOptionLoginNotice;
    }>
  >;

  onSendAConfirmationEmail: () => () => void;
}

export const LoginContext = createContext({} as LoginProps);
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { AuthService } = useContext(AuthStateChangedContext);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [userlogin, setUserLogin] = useState({
    status: false,
    user: {} as SelectOptionLoginNotice,
  });
  const _CheckForm = () => {
    let isError = false;
    if (!email.value) {
      isError = true;
      setEmail({ value: '', error: 'Please enter email address' });
    } else if (!email.value.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)) {
      isError = true;
      setEmail({
        value: email.value,
        error: 'Please enter the correct email address',
      });
    }
    if (!password.value) {
      isError = true;
      setPassword({ value: '', error: 'Please enter password' });
    }
    return !isError;
  };

  // const _checkAccountLogin = (
  //   user:
  //     | {
  //         user: firebase.User | null;
  //         error?: undefined;
  //       }
  //     | {
  //         error: any;
  //         user?: undefined;
  //       }
  // ) => {
  //   if (user.error) {
  //     if (user.error === 'auth/wrong-password') {
  //       setPassword({
  //         value: password.value,
  //         error: 'wrong password',
  //       });
  //     } else if (user.error === 'auth/too-many-requests') {
  //       setUserLogin({ status: true, user: LOGIN_NOTICES.wrong_password });
  //     }
  //   } else if (user.user?.emailVerified) {
  //     setUserLogin({ status: true, user: LOGIN_NOTICES.success });
  //   } else {
  //     setUserLogin({ status: true, user: LOGIN_NOTICES.risk });
  //   }
  // };

  const onSendAConfirmationEmail = () => {
    AuthService.sendAConfirmationEmail();
    setUserLogin({ status: false, user: userlogin.user });
    const timer = setTimeout(() => {
      setUserLogin({ status: true, user: LOGIN_NOTICES.resendMail });
    }, 1500);
    return () => clearTimeout(timer);
  };

  const onSubmit = async () => {
    if (_CheckForm()) {
      const result = await AuthService.checkEmailUser(email.value);
      if (result) {
        // const user = await AuthService.loginUser(email.value, password.value);
        // _checkAccountLogin(user);
      } else {
        setEmail({
          value: email.value,
          error: 'This email is not registered',
        });
        setPassword({ value: '', error: '' });
      }
    }
  };
  const value = {
    email,
    setEmail,
    password,
    setPassword,
    onSubmit,
    userlogin,
    setUserLogin,
    onSendAConfirmationEmail,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
