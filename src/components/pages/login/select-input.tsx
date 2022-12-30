import Link from 'next/link';
import { useContext } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { SimpleButton } from '@/components/button';
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
        <Link href={'forgot-password'}>
          <span className="-mt-5 block cursor-pointer text-right text-sm text-gray-900 transition-colors hover:text-black">
            Forgot password?
          </span>
        </Link>
      </div>
      <div className="pt-8 pb-2">
        <SimpleButton label="Login" onClick={onSubmit} />
      </div>
    </div>
  );
};
