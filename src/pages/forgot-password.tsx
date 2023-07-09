import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { forgotPassWord } from '@/components/Images/forgot-password';
import { SimpleInput } from '@/components/input';
import { Wrapper } from '@/components/pages/wrapper';
import {
  ForgotPasswordContext,
  ForgotPasswordProvider,
} from '@/context/forgot-password-context';

const ForgotPasswordWrapper = () => {
  const { setRecoveryEmail, recoveryemail, onSubmit } = useContext(
    ForgotPasswordContext
  );
  return (
    <Wrapper title="Forgot Password">
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center p-6 bg-gray-200 border shadow-md w-96 rounded-2xl drop-shadow-md">
          <img src={forgotPassWord.forgotpassword.src} alt="" />
          <h2 className="py-2 text-3xl font-bold text-gray-900 drop-shadow-md">
            Forgot Password
          </h2>
          <p className="pb-6">Enter your email address</p>
          <SimpleInput
            label="Email"
            value={recoveryemail.value}
            error={recoveryemail.error}
            type="email"
            maxwidth
            onChangeText={(e) => setRecoveryEmail({ value: e, error: '' })}
          />
          <div className="w-full pt-4">
            <SimpleButton label="Reset Password" color onClick={onSubmit} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const forgotPassword = () => {
  return (
    <ForgotPasswordProvider>
      <ForgotPasswordWrapper />
    </ForgotPasswordProvider>
  );
};

export default forgotPassword;
