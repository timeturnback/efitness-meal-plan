import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface SignUpProps {
  firstname: { value: string; error: string };
  setFirstName: Dispatch<SetStateAction<{ value: string; error: string }>>;
  lafttname: { value: string; error: string };
  setLastName: Dispatch<SetStateAction<{ value: string; error: string }>>;
  email: { value: string; error: string };
  setEmail: Dispatch<SetStateAction<{ value: string; error: string }>>;
  password: { value: string; error: string };
  setPassWord: Dispatch<SetStateAction<{ value: string; error: string }>>;
  confirmpassword: { value: string; error: string };
  setConfirmPassWord: Dispatch<
    SetStateAction<{ value: string; error: string }>
  >;
  showpassword: {
    show: boolean;
    inputtype: string;
  };
  setShowPassword: Dispatch<
    SetStateAction<{
      show: boolean;
      inputtype: string;
    }>
  >;
  onSubmit: () => void;
  accountinfor: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
  setAccountInfor: Dispatch<
    SetStateAction<{
      firstname: string;
      lastname: string;
      email: string;
      password: string;
    }>
  >;
}

export const SignUpContext = createContext({} as SignUpProps);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [firstname, setFirstName] = useState({ value: '', error: '' });
  const [lafttname, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassWord] = useState({ value: '', error: '' });
  const [confirmpassword, setConfirmPassWord] = useState({
    value: '',
    error: '',
  });
  const [showpassword, setShowPassword] = useState({
    show: true,
    inputtype: 'password',
  });
  const [accountinfor, setAccountInfor] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const _CheckForm = () => {
    let isError = false;
    if (!firstname.value) {
      isError = true;
      setFirstName({ value: '', error: 'Please enter first name' });
    } else if (firstname.value.match(/[0-9]/)) {
      isError = true;
      setFirstName({
        value: firstname.value,
        error: 'Please enter your first name correctly',
      });
    }
    if (!lafttname.value) {
      isError = true;
      setLastName({ value: '', error: 'Please enter last name' });
    } else if (lafttname.value.match(/[0-9]/)) {
      isError = true;
      setLastName({
        value: lafttname.value,
        error: 'Please enter your last name correctly',
      });
    }
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
      setPassWord({ value: '', error: 'Please enter password' });
    } else if (password.value && password.value.length < 8) {
      isError = true;
      setPassWord({ value: password.value, error: 'Password is too short' });
    }
    if (!confirmpassword.value) {
      isError = true;
      setConfirmPassWord({ value: '', error: 'Please enter password confirm' });
    } else if (
      password.value &&
      confirmpassword.value &&
      password.value !== confirmpassword.value
    ) {
      isError = true;
      setConfirmPassWord({
        value: confirmpassword.value,
        error: 'Confirmation password is not the same',
      });
    }
    return !isError;
  };
  const onSubmit = () => {
    if (_CheckForm()) {
      setAccountInfor({
        firstname: firstname.value,
        lastname: lafttname.value,
        email: email.value,
        password: password.value,
      });
      console.log(accountinfor);
    }
  };
  const value = {
    firstname,
    setFirstName,
    lafttname,
    setLastName,
    email,
    setEmail,
    password,
    setPassWord,
    confirmpassword,
    setConfirmPassWord,
    showpassword,
    setShowPassword,
    onSubmit,
    accountinfor,
    setAccountInfor,
  };
  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};
