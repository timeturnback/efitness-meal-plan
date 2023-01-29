import '../styles/global.css';

import clsx from 'clsx';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ImageApp } from '@/components/images/app';
import { SimpleLoading } from '@/components/loading';
import { MainContext, MainProvider } from '@/context/main-context';
import { Header } from '@/layouts/components/header';

import Redux from '../redux';

const { store, persistor } = Redux();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MainProvider>
        <MyAppWrapper pageProps={pageProps} Component={Component} />
      </MainProvider>
    </PersistGate>
  </Provider>
);

const MyAppWrapper = ({ Component, pageProps }: any) => {
  const { loading, pathname } = useContext(MainContext);
  return (
    <div>
      <NextNProgress options={{ showSpinner: false }} />
      {loading && <SimpleLoading />}
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
