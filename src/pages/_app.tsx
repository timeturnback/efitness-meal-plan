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
  return (
    <div>
      <NextNProgress options={{ showSpinner: false }} />
      {loading && <SimpleLoading />}
      {/* <SimpleBulletinBoard /> */}
      {openprofile && <ProfileOptions />}
      {pathname !== '/calculate-now' && <Header />}
      <img
        src={ImageApp.Leaves1.src}
        alt=""
        className="fixed -left-7 top-28 z-0 rotate-[32deg]"
      />
      <img
        src={ImageApp.Leaves2.src}
        alt=""
        className={clsx(
          'fixed bottom-6 -right-4 rotate-[270deg]',
          pathname === '/' ? 'z-20' : 'z-0'
        )}
      />
      <div className="absolute z-10 w-full">
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default MyApp;
