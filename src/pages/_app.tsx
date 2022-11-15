import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Header } from '@/layouts/components/header';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Header />
    <div className="pt-10">
      <Component {...pageProps} />
    </div>
  </>
);

export default MyApp;
