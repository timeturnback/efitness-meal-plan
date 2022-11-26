import type { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto h-screen max-w-5xl pt-16">{children}</div>;
};
