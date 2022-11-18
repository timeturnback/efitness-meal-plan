import type { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-w-5xl pt-10">{children}</div>;
};
