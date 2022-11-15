import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface HeaderContextProps {
  onpublic: boolean;
  setOnPublic: Dispatch<SetStateAction<boolean>>;
}

export const HeaderContext = createContext({} as HeaderContextProps);
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [onpublic, setOnPublic] = useState(false);
  const value = {
    onpublic,
    setOnPublic,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
