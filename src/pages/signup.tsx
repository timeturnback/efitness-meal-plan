// import 'firebase/compat/auth';
import clsx from 'clsx';
import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { ImagesComposite } from '@/components/Images/composite-images';
import { SelectInput } from '@/components/pages/signup';
import { Wrapper } from '@/components/pages/wrapper';
import { SignUpContext, SignUpProvider } from '@/context/signup-context';
import { WithPublic } from '@/hooks';

function SignUpSuccess({ email }: { email: string }) {
  const { signupsuccess } = useContext(SignUpContext);
  return (
    <div
      className={clsx(
        'fixed z-20 flex flex-col items-center p-8 bg-gray-200 rounded-md shadow drop-shadow-md top-0 duration-500 max-w-2xl',
        signupsuccess
          ? 'opacity-100 duration-500 visible top-24'
          : 'invisible opacity-0'
      )}
    >
      <img
        src={ImagesComposite.checkmark.src}
        alt=""
        className="h-28 drop-shadow-md"
      />
      <h2 className="flex justify-center text-4xl font-medium text-gray-900 drop-shadow-md">
        Successful account registration
      </h2>
      <p className="text-center text-gray-900 drop-shadow-md">
        Account verification mail has been sent to the email address{' '}
        <span className="font-medium">{email}</span>. Please open the message
        and click the link to verify the account.
      </p>
      <div className="inline-block mt-11">
        <SimpleButton label="Return to the home page" to="/" />
      </div>
    </div>
  );
}

const SignUpWrapper = () => {
  const { signupsuccess, email } = useContext(SignUpContext);
  return (
    <Wrapper title="Sign Up">
      <div className="flex items-center justify-center h-full transition-all drop-shadow-md">
        <SignUpSuccess email={email.value} />
        <div
          className={clsx(
            'transition-all duration-500',
            signupsuccess ? 'blur-sm pointer-events-none select-none' : null
          )}
        >
          <div className="relative px-6 py-4 overflow-hidden bg-gray-200 border shadow-md rounded-2xl">
            <div className="absolute top-0 -left-28 h-2/4 w-4/6 bg-cyan-700 border_top_signup"></div>
            <div className="absolute -bottom-16 -right-32 h-2/4 w-4/6 bg-cyan-700 border_bottom_signup"></div>
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

// const WithPublicPageSignUp = () => {
//   const { useraccountinfo } = useContext(AuthStateChangedContext);
//   const router = useRouter();
//   if (useraccountinfo) {
//     router.replace('/');
//     return <SimpleLoading />;
//   }
//   return SignUp;
// };

export default WithPublic(SignUp);
