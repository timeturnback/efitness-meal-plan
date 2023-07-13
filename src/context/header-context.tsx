import { useRouter } from 'next/router';
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

import { useClickOutSide } from '@/hooks/useClickOutSide';

import { AuthStateChangedContext } from './auth-state-changed-context';

interface HeaderContextProps {
  dropdownmenu: boolean;
  setShowDropDownMenu: Dispatch<SetStateAction<boolean>>;
  menuRef: RefObject<HTMLDivElement>;

  onSignOut: () => void;

  openprofile: boolean;
  setOpenProfile: Dispatch<SetStateAction<boolean>>;
}

export const HeaderContext = createContext({} as HeaderContextProps);
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const { AuthService } = useContext(AuthStateChangedContext);
  const [dropdownmenu, setShowDropDownMenu] = useState(false);
  const menuRef = useClickOutSide(() => {
    setShowDropDownMenu(false);
  });
  const router = useRouter();

  const [openprofile, setOpenProfile] = useState(false);

  const onSignOut = () => {
    router.push('/');
    AuthService.logOut();
  };
  const value = {
    menuRef,
    dropdownmenu,
    setShowDropDownMenu,
    onSignOut,
    openprofile,
    setOpenProfile,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
