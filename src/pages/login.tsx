import clsx from 'clsx';
import styles from 'src/styles/login.module.scss';

import { SelectInput } from '@/components/pages/login';
import { Wrapper } from '@/components/pages/wrapper';
import { LoginProvider } from '@/context/login-context';

const LoginWrapper = () => {
  return (
    <Wrapper>
      <div className="flex h-full items-center justify-center drop-shadow-md">
        <div className="relative w-96 overflow-hidden rounded-2xl border bg-gray-200 px-6 py-4 shadow-md">
          <div
            className={clsx(
              'absolute top-0 -right-24 h-3/5 w-4/6 bg-cyan-700',
              styles.border_top
            )}
          ></div>
          <div
            className={clsx(
              'absolute -bottom-16 -left-32 h-2/4 w-4/6 bg-cyan-700',
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

const Login = () => {
  return (
    <LoginProvider>
      <LoginWrapper />
    </LoginProvider>
  );
};

export default Login;
