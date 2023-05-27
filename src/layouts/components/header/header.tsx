import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';

import { HEADER_CALCULATORS_OPTIONS } from '@/components/constants/select-options';
import { AuthStateChangedContext } from '@/context/auth-state-changed-context';

import {
  HeaderItems,
  HeaderItemsList,
  PrivateHeader,
  PublicHeader,
} from './options-select';

export const Header = () => {
  const { onpublic } = useContext(AuthStateChangedContext);
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
          <HeaderItems title="Release Notes" to="/release-notes" />
        </div>
        <div
          className={clsx(
            onpublic === true || onpublic === false
              ? 'opacity-100 visible'
              : 'opacity-0 invisible'
          )}
        >
          {onpublic ? <PrivateHeader /> : <PublicHeader />}
        </div>
      </div>
    </div>
  );
};
