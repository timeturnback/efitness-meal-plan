import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import type { SelectOptionLink } from '@/constants/select-options';
import { DROPDOWN_MENU_PROFILE } from '@/constants/select-options';
import { AuthStateChangedContext } from '@/context/auth-state-changed-context';
import { HeaderContext } from '@/context/header-context';

export const PublicHeader = () => {
  return (
    <div className="flex items-center h-full uppercase drop-shadow-md">
      <Link href={'/login'}>
        <h2 className="px-2 py-4 transition-colors cursor-pointer hover:text-cyan-700">
          Login
        </h2>
      </Link>
      <span className="mx-1"></span>
      <Link href={'/signup'}>
        <h2 className="px-2 py-4 transition-colors cursor-pointer hover:text-cyan-700">
          Sign Up
        </h2>
      </Link>
    </div>
  );
};

export const PrivateHeader = () => {
  const { gender } = useContext(AuthStateChangedContext);
  const _handler = () => {
    return <ProfilePrivateHeader image={gender.image_header} />;
  };
  return _handler();
};

export const ProfilePrivateHeader = ({ image }: { image: string }) => {
  const { dropdownmenu, setShowDropDownMenu, menuRef } =
    useContext(HeaderContext);
  const { gender } = useContext(AuthStateChangedContext);
  return (
    <div className="relative h-full" ref={menuRef}>
      <div
        className={clsx(
          "relative flex h-full cursor-pointer items-center justify-center before:absolute before:bottom-2 before:right-2 before:z-10 before:h-3 before:w-3 before:rounded-full before:border-2 before:border-gray-300 before:bg-green-400 before:drop-shadow-md before:content-['']",
          gender.value !== 'male' && gender.value !== 'female'
            ? 'before:right-0.5'
            : 'before:right-2'
        )}
        onClick={() => setShowDropDownMenu(!dropdownmenu)}
      >
        <img
          src={image}
          alt=""
          className={clsx(
            'rounded-full drop-shadow-md',
            gender.value !== 'male' && gender.value !== 'female'
              ? 'h-12'
              : 'h-14'
          )}
        />
      </div>
      <DropDownMenu image={image} />
    </div>
  );
};

export const DropDownMenu = ({ image }: { image: string }) => {
  const { dropdownmenu, onSignOut, setOpenProfile, setShowDropDownMenu } =
    useContext(HeaderContext);
  const { setOnPublic, useraccountinfo, gender } = useContext(
    AuthStateChangedContext
  );
  const _onClick = (value: string) => {
    if (value === 'sign out') {
      onSignOut();
      setOnPublic(false);
    } else if (value === 'your profile') {
      setOpenProfile(true);
      setShowDropDownMenu(!dropdownmenu);
    }
  };
  return (
    <div
      className={clsx(
        "absolute right-0 z-40 mt-3 w-64 rounded-md bg-white py-2 shadow-lg drop-shadow-md before:absolute before:-top-2 before:right-4 before:border-x-8 before:border-b-8 transition-all duration-200 before:border-x-transparent before:border-b-white before:content-['']",
        dropdownmenu ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="flex items-center px-2">
        <img
          src={image}
          alt=""
          className={clsx(
            'rounded-full drop-shadow-md',
            gender.value !== 'male' && gender.value !== 'female'
              ? 'h-12'
              : 'h-14'
          )}
        />
        <div className="flex flex-col justify-center w-48 px-2">
          <h2 className="font-medium">
            {useraccountinfo.fullname.replace(' - ', ' ')}
          </h2>
          <span className="overflow-hidden text-xs text-ellipsis">
            {useraccountinfo.email}
          </span>
        </div>
      </div>
      <div className="w-full h-px my-2 bg-gray-600"></div>
      {DROPDOWN_MENU_PROFILE.map((item) => {
        return item.to ? (
          <Link href={item.to} key={item.label}>
            <button className="flex items-center w-full px-3 py-2 text-left transition-colors cursor-pointer group hover:bg-slate-300/50 hover:font-medium">
              <div className="pr-3">
                <item.icon className="w-5 h-5 transition-colors text-gray-800/90 group-hover:text-gray-900" />
              </div>
              {item.label}
            </button>
          </Link>
        ) : (
          <button
            key={item.label}
            className="group flex w-full cursor-pointer items-center px-3 py-2 pl-[13px] text-left transition-colors hover:bg-slate-300/50 hover:font-medium"
            onClick={() => _onClick(item.value)}
          >
            <div className="pr-3">
              <item.icon className="w-5 h-5 transition-colors text-gray-800/90 group-hover:text-gray-900" />
            </div>
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export const HeaderItems = ({ title, to }: { title: string; to: string }) => {
  const { pathname } = useRouter();
  return (
    <Link href={to}>
      <div className="flex items-center h-full transition-all cursor-pointer group drop-shadow-md">
        <span
          className={clsx(
            'px-7 pt-1 text-lg font-medium uppercase text-gray-900 group-hover:text-cyan-700',
            pathname === to && 'text-cyan-700'
          )}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

export const HeaderItemsList = ({
  title,
  listitem,
}: {
  title: string;
  listitem: SelectOptionLink[];
}) => {
  const { pathname } = useRouter();
  return (
    <div>
      <div className="group flex h-full cursor-pointer items-center drop-shadow-md transition-colors container_header">
        <span className="pt-1 text-lg font-medium text-gray-900 uppercase px-7 group-hover:text-cyan-700">
          {title}{' '}
          {listitem && (
            <div className="inline-block pl-1">
              <div className="w-2 h-2 mb-1 rotate-45 border-b-2 border-r-2 border-gray-900 group-hover:border-sky-800/90"></div>
            </div>
          )}
        </span>
      </div>
      {listitem && (
        <div className="fixed -ml-5 hidden hover:block listitem_header">
          <div className="z-10 mt-3 cursor-pointer rounded-xl bg-white px-10 shadow-md before:absolute before:top-1 before:left-2/4 before:-ml-2 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-white before:content-['']">
            {listitem?.map((item) => (
              <Link href={item.to} key={item.value}>
                <span
                  className={clsx(
                    'block py-2 text-center font-medium text-gray-900 transition-colors hover:text-cyan-700',
                    pathname === item.to && 'text-cyan-700'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
