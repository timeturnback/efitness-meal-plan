import Head from 'next/head';
import type { ReactNode } from 'react';

export const Wrapper = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="h-screen max-w-5xl pt-16 mx-auto">
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};
