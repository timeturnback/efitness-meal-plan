import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';

import { auth } from '../firebase';

export const OrSignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <>
      <div className="my-2 text-center">OR</div>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={() => signInWithGoogle()}
          className="z-10 bg-white flex items-center font-medium text-gray-900 justify-center px-4 p-2 rounded-md border border-gray-400 drop-shadow-md hover:bg-slate-200 transition-all"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign In With Google
        </button>
      </div>
    </>
  );
};
