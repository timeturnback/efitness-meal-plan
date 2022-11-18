import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Header } from '@/layouts/components/header';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);

export default MyApp;
