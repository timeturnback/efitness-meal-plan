import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';
import styles from 'src/styles/header.module.scss';

import type { SelectOptionLink } from '@/components/constants/select-options';
import { DROPDOWN_MENU_PROFILE } from '@/components/constants/select-options';
import { ImageHeader } from '@/components/Images/header';
import { HeaderContext } from '@/context/header-context';

export const PublicHeader = () => {
  return (
    <div className="flex h-full items-center uppercase drop-shadow-md">
      <Link href={'login'}>
        <h2 className="cursor-pointer px-2 py-4 transition-colors hover:text-sky-800/90">
          Login
        </h2>
      </Link>
      <span className="mx-1"></span>
      <Link href={'signup'}>
        <h2 className="cursor-pointer px-2 py-4 transition-colors hover:text-sky-800/90">
          Sign Up
        </h2>
      </Link>
    </div>
  );
};

export const PrivateHeader = ({ gender }: { gender: string }) => {
  return gender === 'male' ? (
    <ProfilePrivateHeader image={ImageHeader.MaleProfile.src} />
  ) : (
    <ProfilePrivateHeader image={ImageHeader.FemaleProfile.src} />
  );
};

export const ProfilePrivateHeader = ({ image }: { image: string }) => {
  const { dropdownmenu, setShowDropDownMenu, menuRef } =
    useContext(HeaderContext);
  return (
    <div className="relative h-full" ref={menuRef}>
      <div
        className="relative flex h-full cursor-pointer items-center justify-center before:absolute before:bottom-2 before:right-2 before:z-10 before:h-3 before:w-3 before:rounded-full before:border-2 before:border-gray-300 before:bg-green-400 before:drop-shadow-md before:content-['']"
        onClick={() => setShowDropDownMenu(!dropdownmenu)}
      >
        <img src={image} alt="" className="h-14 drop-shadow-md" />
      </div>
      {dropdownmenu && <DropDownMenu image={image} />}
    </div>
  );
};

export const DropDownMenu = ({ image }: { image: string }) => {
  const { setOnPublic } = useContext(HeaderContext);
  const _onCLick = (value: string) => {
    if (value === 'sign out') setOnPublic(true);
  };
  return (
    <div className="absolute right-0 z-20 mt-3 w-64 rounded-md bg-white py-2 shadow-lg drop-shadow-md before:absolute before:-top-2 before:right-5 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-white before:content-['']">
      <div className="flex items-center px-2">
        <img src={image} alt="" className="h-14 drop-shadow-md" />
        <div className="flex w-48 flex-col justify-center px-2">
          <h2 className="font-medium">Hau Nguyen</h2>
          <span className="overflow-hidden text-ellipsis text-xs">
            haunguyen123sssssss@gmail.com
          </span>
        </div>
      </div>
      <div className="my-2 h-px w-full bg-gray-600"></div>
      {DROPDOWN_MENU_PROFILE.map((item) => {
        return item.to ? (
          <Link href={item.to} key={item.label}>
            <button className="group flex w-full cursor-pointer items-center px-3 py-2 text-left transition-colors hover:bg-slate-300/50 hover:font-medium">
              <div className="pr-3">
                <item.icon className="h-5 w-5 text-gray-800/90 transition-colors group-hover:text-gray-900" />
              </div>
              {item.label}
            </button>
          </Link>
        ) : (
          <button
            key={item.label}
            className="group flex w-full cursor-pointer items-center px-3 py-2 pl-[13px] text-left transition-colors hover:bg-slate-300/50 hover:font-medium"
            onClick={() => _onCLick(item.value)}
          >
            <div className="pr-3">
              <item.icon className="h-5 w-5 text-gray-800/90 transition-colors group-hover:text-gray-900" />
            </div>
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export const HeaderItems = ({ title, to }: { title: string; to: string }) => {
  return (
    <Link href={to}>
      <div className="flex h-full cursor-pointer items-center drop-shadow-md transition-all hover:text-sky-800/90">
        <span className="px-7 pt-1 text-lg uppercase">{title}</span>
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
  return (
    <div>
      <div
        className={clsx(
          'group flex h-full cursor-pointer items-center drop-shadow-md transition-colors hover:text-sky-800/90',
          styles.container
        )}
      >
        <span className="px-7 pt-1 text-lg uppercase">
          {title}{' '}
          {listitem && (
            <div className="inline-block pl-1">
              <div className="mb-1 h-2 w-2 rotate-45 border-b-2 border-r-2 border-gray-900 group-hover:border-sky-800/90"></div>
            </div>
          )}
        </span>
      </div>
      {listitem && (
        <div className={clsx('fixed hidden hover:block', styles.listitem)}>
          <div className="z-10 mt-3 -ml-5 cursor-pointer rounded-xl bg-white px-10 shadow-md before:absolute before:top-1 before:left-2/4 before:-ml-2 before:border-x-8 before:border-b-8 before:border-x-transparent before:border-b-white before:content-['']">
            {listitem?.map((item) => (
              <Link href={item.to} key={item.value}>
                <span className="block py-2 text-center font-medium transition-colors hover:text-sky-800/90">
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
