import clsx from 'clsx';
import { useContext } from 'react';
import styles from 'src/styles/login.module.scss';

import { SimpleButton } from '@/components/button';
import { SelectInput } from '@/components/pages/login';
import { Wrapper } from '@/components/pages/wrapper';
import { LoginContext, LoginProvider } from '@/context/login-context';
import { WithPublic } from '@/hooks';

function LoginNotice() {
  const { email, userlogin, setUserLogin, onSendAConfirmationEmail } =
    useContext(LoginContext);
  const { title, image, content_1, content_2, button_close } = userlogin.user;
  return (
    <div
      className={clsx(
        'fixed z-20 flex-col flex items-center p-8 bg-gray-200 rounded-md shadow drop-shadow-md top-0 duration-500 max-w-2xl',
        userlogin.status
          ? 'opacity-100 duration-500 visible top-24'
          : 'invisible opacity-0'
      )}
    >
      <img src={image} alt="" className="h-28 drop-shadow-md" />
      <h2 className="flex justify-center text-4xl font-medium text-gray-900 drop-shadow-md">
        {title}
      </h2>
      {content_1 && content_2 ? (
        <p className="text-center text-gray-900 drop-shadow-md">
          {content_1} <span className="font-medium">{email.value}</span>{' '}
          {content_2}
        </p>
      ) : null}
      {title === 'Not verified' ? (
        <span className="text-gray-900">
          Account verification mail was not received?{' '}
          <span
            onClick={() => onSendAConfirmationEmail()}
            className="font-medium cursor-pointer text-sky-600 decoration-1 hover:underline"
          >
            Resend mail
          </span>
        </span>
      ) : null}
      {button_close && (
        <div className="inline-block mt-11">
          <SimpleButton
            label="Close"
            onClick={() =>
              setUserLogin({ status: false, user: userlogin.user })
            }
          />
        </div>
      )}
    </div>
  );
}

const LoginWrapper = () => {
  const { userlogin } = useContext(LoginContext);
  return (
    <Wrapper title="Login">
      <div className="flex items-center justify-center h-full drop-shadow-md">
        <LoginNotice />
        <div
          className={clsx(
            'relative px-6 py-4 overflow-hidden bg-gray-200 border shadow-md w-96 rounded-2xl',
            userlogin.status ? 'blur-sm pointer-events-none select-none' : null
          )}
        >
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

export default WithPublic(Login);
