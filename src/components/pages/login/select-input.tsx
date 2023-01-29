import Link from 'next/link';
import { useContext } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { SimpleButton } from '@/components/button';
import { orSignIn } from '@/components/firebase';
import { SimpleInput } from '@/components/input';
import { LoginContext } from '@/context/login-context';

export const SelectInput = () => {
  const { email, setEmail, showpass, setShowPass, pass, setPass, onSubmit } =
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
      <div className="relative">
        <SimpleInput
          label="Password"
          type={showpass.inputtype}
          value={pass.value}
          error={pass.error}
          onChangeText={(e) => setPass({ value: e, error: '' })}
          maxwidth
        />
        {!showpass.show ? (
          <AiOutlineEye
            className="absolute right-4 top-[46%] cursor-pointer text-xl"
            onClick={() =>
              setShowPass({
                show: !showpass.show,
                inputtype: 'password',
              })
            }
          />
        ) : (
          <AiOutlineEyeInvisible
            className="absolute right-4 top-[46%] cursor-pointer text-xl"
            onClick={() =>
              setShowPass({ show: !showpass.show, inputtype: 'text' })
            }
          />
        )}
        <Link href="forgot-password">
          <span className="absolute z-20 block w-full -mt-5 text-sm text-right text-gray-900 transition-colors cursor-pointer hover:text-black">
            Forgot password?
          </span>
        </Link>
      </div>
      <div className="pt-8 pb-2">
        <SimpleButton label="Login" color onClick={onSubmit} />
      </div>
      {orSignIn()}
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
