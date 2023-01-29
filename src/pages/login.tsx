import clsx from 'clsx';
import styles from 'src/styles/login.module.scss';

import { SelectInput } from '@/components/pages/login';
import { Wrapper } from '@/components/pages/wrapper';
import { LoginProvider } from '@/context/login-context';

const LoginWrapper = () => {
  return (
    <Wrapper title="Login">
      <div className="flex items-center justify-center h-full drop-shadow-md">
        <div className="relative px-6 py-4 overflow-hidden bg-gray-200 border shadow-md w-96 rounded-2xl">
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
          <h2 className="pb-3 text-3xl font-bold text-center text-gray-900 drop-shadow-md">
            Login
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
