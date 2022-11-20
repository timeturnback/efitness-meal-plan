import Link from 'next/link';
import { useContext } from 'react';

import { HEADER_CALCULATORS_OPTIONS } from '@/components/constants/select-options';
import { HeaderContext, HeaderProvider } from '@/context/header-context';

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
  const { onpublic } = useContext(HeaderContext);
  return (
    <div className="fixed top-0 z-50 h-16 w-full bg-white shadow-lg">
      <div className="mx-auto flex h-full max-w-5xl justify-between">
        <Link href={'/'}>
          <div className="flex h-full cursor-pointer items-center">
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
          <HeaderItems title="About" to="about" />
        </div>
        <div>
          {onpublic ? <PublicHeader /> : <PrivateHeader gender="male" />}
        </div>
      </div>
    </div>
  );
};
