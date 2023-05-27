import { useRouter } from 'next/router';
import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';
import { createContext, useState } from 'react';

import { AuthService } from '@/hooks/useAuth';
import { useClickOutSide } from '@/hooks/useClickOutSide';

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
  const [dropdownmenu, setShowDropDownMenu] = useState(false);
  const menuRef = useClickOutSide(() => {
    setShowDropDownMenu(false);
  });
  const router = useRouter();

  const [openprofile, setOpenProfile] = useState(false);

  const onSignOut = () => {
    router.push('/');
    AuthService.signOut();
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
