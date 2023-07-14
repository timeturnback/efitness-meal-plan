import { useContext } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';

import SimpleSelectProfile from '@/components/simpleselectprofile/simpleselectprofile';
import { AuthStateChangedContext } from '@/context/auth-state-changed-context';
import { HeaderContext } from '@/context/header-context';

export const ProfileOptions = () => {
  const { setOpenProfile } = useContext(HeaderContext);
  const { useraccountinfo, gender } = useContext(AuthStateChangedContext);
  return (
    <div className="fixed z-30 grid items-center justify-center w-full h-full pt-40 pb-20 overflow-scroll bg-gray-900/60 myprofile">
      <div className="p-6 bg-gray-200 rounded-md shadow w-[500px] drop-shadow-md">
        <div className="relative flex items-center">
          <h2 className="w-full text-3xl font-medium text-center text-gray-900 drop-shadow-md">
            My Profile
          </h2>
          <IoCloseSharp
            className="absolute right-0 text-3xl text-gray-900 cursor-pointer"
            onClick={() => setOpenProfile(false)}
          />
        </div>
        <div className="flex pt-4">
          <div className="relative inline-block w-auto h-24 border-4 border-gray-600 rounded-full shadow drop-shadow-md">
            <img
              className="w-full h-full bg-gray-200 rounded-full"
              src={gender.image ? gender.image_header : useraccountinfo.avatar}
              alt=""
            />
            <div className="absolute bottom-0 right-0 p-1 transition-colors duration-200 bg-gray-400 rounded-full shadow cursor-pointer hover:bg-gray-500 w-7 drop-shadow-md">
              <AiFillCamera className="w-full h-full text-gray-900" />
            </div>
          </div>
          <div className="flex flex-col pl-6 justify-evenly">
            <SimpleSelectProfile.FullName
              title={useraccountinfo.fullname}
              bold
            />
            <h2>{useraccountinfo.email}</h2>
          </div>
        </div>
        <div className="pt-4">
          <h2 className="text-lg font-medium text-gray-900">
            Basic information
          </h2>
          <div className="pt-4">
            <SimpleSelectProfile.DropDown
              title={gender.value ? gender.value : 'Unknown'}
            />
          </div>
        </div>
        <div className="pt-4">
          <h2 className="text-lg font-medium text-gray-900">
            About the account
          </h2>
          <div className="pt-4">
            <SimpleSelectProfile.ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
};
