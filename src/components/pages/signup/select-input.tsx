/* eslint-disable no-irregular-whitespace */
import Link from 'next/link';
import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { SimpleInput } from '@/components/input';
import { OrSignIn } from '@/components/orsignin';
import { SignUpContext } from '@/context/signup-context';

export const SelectInput = () => {
  const {
    firstname,
    lastname,
    password,
    email,
    setFirstName,
    setLastName,
    setEmail,
    setPassWord,
    onSubmit,
  } = useContext(SignUpContext);
  return (
    <>
      <div className="flex gap-5">
        <SimpleInput
          label="First Name"
          value={firstname.value}
          error={firstname.error}
          onChangeText={(e) => setFirstName({ value: e, error: '' })}
          type="text"
        />
        <SimpleInput
          label="Last Name"
          value={lastname.value}
          error={lastname.error}
          onChangeText={(e) => setLastName({ value: e, error: '' })}
          type="text"
        />
      </div>
      <div className="grid">
        <SimpleInput
          label="Email"
          value={email.value}
          error={email.error}
          onChangeText={(e) => setEmail({ value: e, error: '' })}
          maxwidth
          type="email"
        />
        <div className="relative">
          <SimpleInput
            label="Password"
            value={password.value}
            error={password.error}
            onChangeText={(e) => setPassWord({ value: e, error: '' })}
            maxwidth
            unit=""
            seepassword
          />
        </div>
        <div className="flex justify-between w-full">
          <div className="w-full pt-6">
            <SimpleButton label="Sign Up" color onClick={onSubmit} />
          </div>
        </div>
        <OrSignIn />
        <span className="z-10 flex items-center justify-center text-gray-900">
          Already have an account.&nbsp;
          <Link href={'login'}>
            <span className="z-20 font-medium text-gray-900 transition-colors cursor-pointer drop-shadow-md hover:underline">
              Login
            </span>
          </Link>
        </span>
      </div>
    </>
  );
};
