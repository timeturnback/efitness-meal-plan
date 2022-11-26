import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

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
  pass: {
    value: string;
    error: string;
  };
  setPass: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;
  showpass: {
    show: boolean;
    inputtype: string;
  };
  setShowPass: Dispatch<
    SetStateAction<{
      show: boolean;
      inputtype: string;
    }>
  >;
  onSubmit: () => void;
}

export const LoginContext = createContext({} as LoginProps);
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [pass, setPass] = useState({ value: '', error: '' });
  const [showpass, setShowPass] = useState({
    show: true,
    inputtype: 'password',
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
    if (!pass.value) {
      isError = true;
      setPass({ value: '', error: 'Please enter password' });
    }
    return !isError;
  };
  const onSubmit = () => {
    if (_CheckForm()) {
      //
    }
  };
  const value = {
    email,
    setEmail,
    showpass,
    setShowPass,
    pass,
    setPass,
    onSubmit,
  };
  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
