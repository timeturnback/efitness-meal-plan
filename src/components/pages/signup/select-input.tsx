import { useContext } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { SimpleButton } from '@/components/button';
import { SimpleInput } from '@/components/input';
import { SignUpContext } from '@/context/signup-context';

export const SelectInput = () => {
  const {
    firstname,
    lafttname,
    password,
    confirmpassword,
    email,
    setFirstName,
    setLastName,
    setEmail,
    setPassWord,
    setConfirmPassWord,
    showpassword,
    setShowPassword,
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
          value={lafttname.value}
          error={lafttname.error}
          onChangeText={(e) => setLastName({ value: e, error: '' })}
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
            type={showpassword.inputtype}
          />
          {!showpassword.show ? (
            <AiOutlineEye
              className="absolute right-4 top-[46%] cursor-pointer text-xl"
              onClick={() =>
                setShowPassword({
                  show: !showpassword.show,
                  inputtype: 'password',
                })
              }
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-4 top-[46%] cursor-pointer text-xl"
              onClick={() =>
                setShowPassword({ show: !showpassword.show, inputtype: 'text' })
              }
            />
          )}
        </div>
        <div className="relative">
          <SimpleInput
            label="Confirm Password"
            value={confirmpassword.value}
            error={confirmpassword.error}
            onChangeText={(e) => setConfirmPassWord({ value: e, error: '' })}
            maxwidth
            unit=""
            type={showpassword.inputtype}
          />
          {!showpassword.show ? (
            <AiOutlineEye
              className="absolute right-4 top-[46%] cursor-pointer text-xl outline-none"
              onClick={() =>
                setShowPassword({
                  show: !showpassword.show,
                  inputtype: 'password',
                })
              }
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-4 top-[46%] cursor-pointer text-xl outline-none"
              onClick={() =>
                setShowPassword({ show: !showpassword.show, inputtype: 'text' })
              }
            />
          )}
        </div>
        <div className="flex w-full justify-end">
          <div className="w-2/5 pt-6">
            <SimpleButton label="Sign Up" onClick={onSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};
