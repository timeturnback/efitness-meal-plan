import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import { useClickOutSide } from '@/hooks/useClickOutSide';

interface HeaderContextProps {
  onpublic: boolean;
  setOnPublic: Dispatch<SetStateAction<boolean>>;
  dropdownmenu: boolean;
  setShowDropDownMenu: Dispatch<SetStateAction<boolean>>;
  menuRef: RefObject<HTMLDivElement>;
}

export const HeaderContext = createContext({} as HeaderContextProps);
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [onpublic, setOnPublic] = useState(false);
  const [dropdownmenu, setShowDropDownMenu] = useState(false);
  const menuRef = useClickOutSide(() => {
    setShowDropDownMenu(false);
  });
  const value = {
    onpublic,
    setOnPublic,
    menuRef,
    dropdownmenu,
    setShowDropDownMenu,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
