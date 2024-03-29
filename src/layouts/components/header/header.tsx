import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';

import { HEADER_CALCULATORS_OPTIONS } from '@/constants/select-options';
import { AuthStateChangedContext } from '@/context/auth-state-changed-context';

import {
  HeaderItems,
  HeaderItemsList,
  PrivateHeader,
  PublicHeader,
} from './options-select';

export const Header = () => {
  const { userInfo } = useContext(AuthStateChangedContext);
  return (
    <div className="fixed top-0 z-40 w-full h-16 bg-white shadow-lg">
      <div className="flex justify-between h-full max-w-6xl mx-auto">
        <div className="flex">
          <Link href={'/'}>
            <div className="flex items-center h-full cursor-pointer">
              <h2 className="text-2xl font-bold text-gray-900 drop-shadow-md">
                SimpleHealthPlan
              </h2>
            </div>
          </Link>
          <HeaderItems title="Home" to="/" />
          <HeaderItemsList
            title="Calculators"
            listitem={HEADER_CALCULATORS_OPTIONS}
          />
          <HeaderItems title="Foods" to="/foods" />
          <HeaderItems title="Muscle Exercises" to="/muscle-exercises" />
        </div>
        <div
          className={clsx(
            userInfo || !userInfo
              ? 'opacity-100 visible'
              : 'opacity-0 invisible'
          )}
        >
          {userInfo ? <PrivateHeader /> : <PublicHeader />}
        </div>
      </div>
    </div>
  );
};
