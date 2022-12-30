import clsx from 'clsx';
import styles from 'src/styles/signup.module.scss';

import { SelectInput } from '@/components/pages/signup';
import { Wrapper } from '@/components/pages/wrapper';
import { SignUpProvider } from '@/context/signup-context';

const SignUpWrapper = () => {
  return (
    <Wrapper>
      <div className="flex h-full items-center justify-center drop-shadow-md">
        <div className="relative overflow-hidden rounded-2xl border bg-gray-200 px-6 py-4 shadow-md">
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
          <h2 className="pb-3 text-center text-3xl font-bold text-gray-900 drop-shadow-md">
            Sign Up
          </h2>
          <SelectInput />
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

export default SignUp;
