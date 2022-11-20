import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useContext } from 'react';

import {
  CalculateNowContext,
  CalculateNowProvider,
} from '@/context/calculate-now-context';
import { Header } from '@/layouts/components/header';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <CalculateNowProvider>
    <MyAppWrapper pageProps={pageProps} Component={Component} />
  </CalculateNowProvider>
);

const MyAppWrapper = ({ Component, pageProps }: any) => {
  const { pathname } = useContext(CalculateNowContext);
  return (
    <>
      {pathname !== '/calculate-now' && <Header />}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
