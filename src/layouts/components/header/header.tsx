import Link from 'next/link';
import { useContext } from 'react';

import { HEADER_CALCULATORS_OPTIONS } from '@/components/constants/select-options';
import { HeaderProvider } from '@/context/header-context';
import { MainContext } from '@/context/main-context';

import {
  HeaderItems,
  HeaderItemsList,
  PrivateHeader,
  PublicHeader,
} from './options-select';

export const Header = () => {
  return (
    <HeaderProvider>
      <HeaderWrapper />
    </HeaderProvider>
  );
};

export const HeaderWrapper = () => {
  const { onpublic } = useContext(MainContext);
  return (
    <div className="fixed top-0 z-40 w-full h-16 bg-white shadow-lg">
      <div className="flex justify-between h-full max-w-5xl mx-auto">
        <Link href={'/'}>
          <div className="flex items-center h-full cursor-pointer">
            <h2 className="text-2xl font-bold text-gray-900 drop-shadow-md">
              SimpleHealthPlan
            </h2>
          </div>
        </Link>
        <div className="flex">
          <HeaderItems title="Home" to="/" />
          <HeaderItemsList
            title="Calculators"
            listitem={HEADER_CALCULATORS_OPTIONS}
          />
          <HeaderItems title="Foods" to="/foods" />
        </div>
        <div>{onpublic ? <PrivateHeader /> : <PublicHeader />}</div>
      </div>
    </div>
  );
};
