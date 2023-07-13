import Link from 'next/link';
import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { SimpleInput } from '@/components/input';
import { OrSignIn } from '@/components/orsignin';
import { LoginContext } from '@/context/login-context';

export const SelectInput = () => {
  const { email, setEmail, password, setPassword, onSubmit } =
    useContext(LoginContext);
  return (
    <div className="relative">
      <SimpleInput
        label="Email"
        type="email"
        value={email.value}
        error={email.error}
        onChangeText={(e) => setEmail({ value: e, error: '' })}
        maxwidth
      />
      <SimpleInput
        label="Password"
        value={password.value}
        error={password.error}
        onChangeText={(e) => setPassword({ value: e, error: '' })}
        maxwidth
        seepassword
      />
      <div className="text-end">
        <Link href="forgot-password">
          <span className="z-20 w-full -mt-5 text-sm font-normal text-right text-gray-900 transition-colors cursor-pointer hover:text-black">
            Forgot password?
          </span>
        </Link>
      </div>
      <div className="pt-8 pb-2">
        <SimpleButton label="Login" color onClick={() => onSubmit()} />
      </div>
      <OrSignIn />
      <span className="flex items-center justify-center text-gray-900">
        Don&apos;t have an account.&nbsp;
        <Link href={'signup'}>
          <span className="z-20 font-medium text-gray-900 transition-colors cursor-pointer drop-shadow-md hover:underline">
            Sign Up
          </span>
        </Link>
      </span>
    </div>
  );
};
