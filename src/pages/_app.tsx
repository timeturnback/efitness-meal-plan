import '../styles/global.css';

import clsx from 'clsx';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ImageApp } from '@/components/Images/app';
import { SimpleLoading } from '@/components/loading';
import { AuthStateChangedProvider } from '@/context/auth-state-changed-context';
import { HeaderContext, HeaderProvider } from '@/context/header-context';
import { MainContext, MainProvider } from '@/context/main-context';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Header } from '@/layouts/components/header/header';
import { ProfileOptions } from '@/layouts/components/header/profile-options';

import Redux from '../redux';

const { store, persistor } = Redux();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HeaderProvider>
        <MainProvider>
          <AuthStateChangedProvider>
            <MyAppWrapper pageProps={pageProps} Component={Component} />
          </AuthStateChangedProvider>
        </MainProvider>
      </HeaderProvider>
    </PersistGate>
  </Provider>
);

const MyAppWrapper = ({ Component, pageProps }: any) => {
  const { loading, pathname } = useContext(MainContext);
  const { openprofile } = useContext(HeaderContext);
  const leafleft = useScrollReveal({ origin: 'left' });
  const leafright = useScrollReveal({ origin: 'bottom' });
  return (
    <div>
      <NextNProgress options={{ showSpinner: false }} />
      {loading && <SimpleLoading />}
      {openprofile && <ProfileOptions />}
      {pathname !== '/calculate-now' && <Header />}
      <img
        ref={leafleft}
        src={ImageApp.Leaves1.src}
        alt=""
        className={clsx(
          'fixed  top-28 z-0 rotate-[32deg]',
          leafleft ? '-left-7' : null
        )}
      />
      <img
        ref={leafright}
        src={ImageApp.Leaves2.src}
        alt=""
        className={clsx(
          'fixed bottom-6 rotate-[270deg]',
          pathname === '/' ? 'z-20' : 'z-0',
          leafright ? '-right-4' : ''
        )}
      />
      <div className="absolute z-10 w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
