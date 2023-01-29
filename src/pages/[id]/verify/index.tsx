import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { SimpleButton } from '@/components/button';
import { SimpleInput } from '@/components/input';
import { SimpleLoading } from '@/components/loading';
import { Wrapper } from '@/components/pages/wrapper';
import { ForgotPasswordProvider } from '@/context/forgot-password-context';
import { MainContext } from '@/context/main-context';
import { VerifyContext, VerifyProvider } from '@/context/verify-context';

const VerifyWrapper = () => {
  const router = useRouter();
  const { countdown, onReSend } = useContext(VerifyContext);
  const { setOnPublic } = useContext(MainContext);
  const { email } = router.query;

  useEffect(() => {
    setOnPublic(false);
  }, []);

  return (
    <Wrapper title="Verify Email">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-start mb-48 text-gray-900 rounded-md shadow-md bg-cyan-50 p-7 drop-shadow-md">
          <h2 className="pb-5 text-2xl font-medium">
            Enter Security Code To Continue
          </h2>
          <p className="text-center">
            The verification code has been sent to the email address{' '}
            <span className="font-medium">{email}</span>. Please check your
            email messages.
          </p>
          <p>Your code is 6 digits long.</p>
          <SimpleInput value={''} />
          {countdown !== 0 ? (
            <p>
              Please wait <span className="font-medium">{countdown}</span>{' '}
              seconds to resend the code.
            </p>
          ) : (
            <span
              onClick={() => onReSend()}
              className="transition-colors cursor-pointer text-cyan-700 hover:underline hover:decoration-1 hover:underline-offset-2 hover:text-cyan-900"
            >
              Resend the code
            </span>
          )}
          <div className="w-full pt-4">
            <SimpleButton label={'Continue'} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Verify = () => {
  return (
    <ForgotPasswordProvider>
      <VerifyProvider>
        <VerifyWrapper />
      </VerifyProvider>
    </ForgotPasswordProvider>
  );
};

const RouterVerifyEmailPublic = () => {
  const { infocreateuser } = useContext(MainContext);
  const [test, settest] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!infocreateuser) {
      settest(false);
      router.push('/');
    }
  }, [infocreateuser]);
  return test ? <Verify /> : <SimpleLoading />;
};

export default RouterVerifyEmailPublic;
