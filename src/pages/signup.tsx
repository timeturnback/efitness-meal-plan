// import 'firebase/compat/auth';
import clsx from 'clsx';
import { useContext } from 'react';
import styles from 'src/styles/signup.module.scss';

import { SelectInput } from '@/components/pages/signup';
import { Wrapper } from '@/components/pages/wrapper';
import { MainContext } from '@/context/main-context';
import { SignUpProvider } from '@/context/signup-context';
import { RouterPublic } from '@/hooks/useRouterPublic';

const SignUpWrapper = () => {
  return (
    <Wrapper title="Sign Up">
      <div className="flex items-center justify-center h-full drop-shadow-md">
        <div>
          <div className="relative px-6 py-4 overflow-hidden bg-gray-200 border shadow-md rounded-2xl">
            <div
              className={clsx(
                'absolute top-0 -left-28 h-2/4 w-4/6 bg-cyan-700',
                styles.border_top
              )}
            ></div>
            <div
              className={clsx(
                'absolute -bottom-16 -right-32 h-2/4 w-4/6 bg-cyan-700',
                styles.border_bottom
              )}
            ></div>
            <h2 className="pb-3 text-3xl font-bold text-center text-gray-900 drop-shadow-md">
              Sign Up
            </h2>
            <SelectInput />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const SignUp = () => {
  return (
    <SignUpProvider>
      <SignUpWrapper />
    </SignUpProvider>
  );
};

const _CheckForm = () => {
  const { onpublic, infocreateuser } = useContext(MainContext);
  if (onpublic && infocreateuser) return true;
  return false;
};

export default RouterPublic(SignUp, _CheckForm);
