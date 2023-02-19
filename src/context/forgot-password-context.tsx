import 'firebase/compat/auth';

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';

interface forgotPasswordProps {
  recoveryemail: {
    value: string;
    error: string;
  };
  setRecoveryEmail: Dispatch<
    SetStateAction<{
      value: string;
      error: string;
    }>
  >;

  onSubmit: () => Promise<void>;

  dataresetpassword: {
    email: string;
    to: string;
    code: number;
  };
  setDataResetPassword: Dispatch<
    SetStateAction<{
      email: string;
      to: string;
      code: number;
    }>
  >;
}

export const ForgotPasswordContext = createContext({} as forgotPasswordProps);

export const ForgotPasswordProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recoveryemail, setRecoveryEmail] = useState({ value: '', error: '' });
  const [dataresetpassword, setDataResetPassword] = useState({
    email: '',
    to: '',
    code: 0,
  });

  const _CheckForm = () => {
    let isError = false;
    if (!recoveryemail.value) {
      isError = true;
      setRecoveryEmail({
        value: recoveryemail.value,
        error: 'Please enter the email you need to recover your password.',
      });
    }
    return !isError;
  };

  const onSubmit = async () => {
    if (_CheckForm()) {
      // const result = await onCheckEmailUser(recoveryemail.value);
      // if (!result.length) {
      //   setRecoveryEmail({
      //     value: recoveryemail.value,
      //     error: 'This email is not registered',
      //   });
      // } else {
      //   router.push(`/forgot-password/verify?email=${recoveryemail.value}`);
      //   setDataResetPassword({
      //     email: recoveryemail.value,
      //     to: recoveryemail.value,
      //     code: Number(`${Math.random()}`.substring(2, 8)),
      //   });
      // }
    }
  };

  useEffect(() => {
    if (dataresetpassword.code) {
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: dataresetpassword.email,
          code: dataresetpassword.code,
          to: dataresetpassword.to,
        }),
      });
    }
  }, [dataresetpassword]);

  const value = {
    recoveryemail,
    setRecoveryEmail,
    onSubmit,
    dataresetpassword,
    setDataResetPassword,
  };
  return (
    <ForgotPasswordContext.Provider value={value}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};
