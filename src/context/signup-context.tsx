import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

import { AuthStateChangedContext } from './auth-state-changed-context';

interface SignUpProps {
  firstname: { value: string; error: string };
  setFirstName: Dispatch<SetStateAction<{ value: string; error: string }>>;
  lastname: { value: string; error: string };
  setLastName: Dispatch<SetStateAction<{ value: string; error: string }>>;
  email: { value: string; error: string };
  setEmail: Dispatch<SetStateAction<{ value: string; error: string }>>;
  password: { value: string; error: string };
  setPassWord: Dispatch<SetStateAction<{ value: string; error: string }>>;
  onSubmit: () => void;

  signupsuccess: boolean;
  setSignUpSuccess: Dispatch<SetStateAction<boolean>>;
}

export const SignUpContext = createContext({} as SignUpProps);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const { AuthService } = useContext(AuthStateChangedContext);
  const [firstname, setFirstName] = useState({ value: '', error: '' });
  const [lastname, setLastName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassWord] = useState({ value: '', error: '' });
  const [signupsuccess, setSignUpSuccess] = useState(false);

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
    if (!lastname.value) {
      isError = true;
      setLastName({ value: '', error: 'Please enter last name' });
    } else if (lastname.value.match(/[0-9]/)) {
      isError = true;
      setLastName({
        value: lastname.value,
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
    return !isError;
  };

  const onSubmit = () => {
    if (_CheckForm()) {
      createUserWithEmailAndPassword(email.value, password.value);
      setSignUpSuccess(true);
    }
  };

  const createUserWithEmailAndPassword = async (
    emailUser: string,
    passwordUser: string
  ) => {
    const result = await AuthService.checkEmailUser(emailUser);
    if (result) {
      setEmail({
        value: email.value,
        error:
          'The email address is already in use by another account, please use another email.',
      });
    } else {
      await AuthService.createUser({
        email: emailUser,
        password: passwordUser,
        firstname: firstname.value,
        lastname: lastname.value,
      });
    }
  };

  const value = {
    firstname,
    setFirstName,
    lastname,
    setLastName,
    email,
    setEmail,
    password,
    setPassWord,
    onSubmit,
    signupsuccess,
    setSignUpSuccess,
  };
  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
};
