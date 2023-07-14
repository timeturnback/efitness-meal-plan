import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { AuthStateChangedContext } from '@/context/auth-state-changed-context';

import { DROP_DOWN_OPTIONS_GENDER } from '../../constants/select-options';
import { SimpleButton } from '../button';
import { ImagesUserProfile } from '../Images/user-profile';
import { DropDownSelect, SimpleInput } from '../input';

const _onChange = ({
  setCurrentValue,
}: {
  setCurrentValue: (value: boolean) => void;
}) => {
  return (
    <div
      className="flex items-center justify-center p-1 ml-4 transition-colors duration-200 bg-gray-400 rounded-full shadow cursor-pointer w-7 h-7 drop-shadow-md hover:bg-gray-500"
      onClick={() => setCurrentValue(true)}
    >
      <FaPen className="w-4 h-4 text-gray-900" />
    </div>
  );
};

const _onChangeEdit = ({
  onClick,
  disabled,
  onSubmit,
}: {
  onClick: (value: boolean) => void;
  disabled: boolean;
  onSubmit: () => void;
}) => {
  return (
    <div className="flex justify-end gap-4 pt-4">
      <SimpleButton label="Cancel" small onClick={() => onClick(false)} />
      <SimpleButton
        label="Save"
        small
        disabled={disabled}
        onClick={() => onSubmit()}
      />
    </div>
  );
};

export const EditAndSaveInfomation = ({
  onClick,
  currentvalue,
  disabled,
  onSubmit,
}: {
  onClick: (value: boolean) => void;
  currentvalue: boolean;
  disabled: boolean;
  onSubmit: () => void;
}) => {
  return currentvalue ? (
    <_onChangeEdit onClick={onClick} disabled={disabled} onSubmit={onSubmit} />
  ) : (
    <_onChange setCurrentValue={onClick} />
  );
};

const DropDown = ({ title }: { title: string; edit?: boolean }) => {
  const [currentvalue, setCurrentValue] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState(true);
  const [valuegender, setValueGender] = useState('');
  const dispatch = useDispatch();

  const { gender } = useContext(AuthStateChangedContext);

  const onSubmit = () => {
    if (valuegender === 'male') {
      dispatch({
        type: 'infousers',
        payload: {
          gender: valuegender,
          image_gender: ImagesUserProfile.IconMale.src,
        },
      });
    } else if (valuegender === 'female') {
      dispatch({
        type: 'infousers',
        payload: {
          gender: valuegender,
          image_gender: ImagesUserProfile.IconFemale.src,
        },
      });
    } else {
      dispatch({
        type: 'infousers',
        payload: {
          gender: valuegender,
          image_gender: ImagesUserProfile.IconEquality.src,
        },
      });
    }
    setCurrentValue(false);
  };

  const _handleChangeGender = (e: string) => {
    if (e !== title) {
      setValueGender(e);
      setButtonDisabled(false);
    }
  };

  return (
    <div
      className={clsx(
        currentvalue ? 'inline-block w-[220px]' : 'flex items-center'
      )}
    >
      {currentvalue ? (
        <>
          <DropDownSelect
            label="Gender"
            options={DROP_DOWN_OPTIONS_GENDER}
            setCurrentValue={(e) => _handleChangeGender(e)}
            defaultValue={title !== 'Unknown' ? title : ''}
          />
        </>
      ) : (
        <>
          {gender.image ? (
            <img className="w-8 h-8" src={gender.image} alt="" />
          ) : null}
          <div className={clsx(gender.image ? 'pl-2' : null)}>
            <span className="text-sm font-medium text-gray-800">Gender</span>
            <h2 className="text-lg font-medium capitalize">{title}</h2>
          </div>
        </>
      )}
      <EditAndSaveInfomation
        currentvalue={currentvalue}
        onClick={setCurrentValue}
        disabled={buttondisabled}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const FullName = ({ title, bold }: { title: string; bold?: boolean }) => {
  const { useraccountinfo } = useContext(AuthStateChangedContext);
  const [currentvalue, setCurrentValue] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState(true);
  const fn = useraccountinfo.fullname.split(' ')[0];
  const ln = useraccountinfo.fullname.split(' ')[1];
  const [firstname, setFirstName] = useState({
    inputfirstname: '',
    first: fn,
  });
  const [lastname, setLastName] = useState({
    inputlastname: '',
    last: ln,
  });

  // useEffect(() => {
  //   setFirstName({
  //     ...firstname,
  //     first: fn,
  //   });
  //   setLastName({
  //     ...lastname,
  //     last: ln,
  //   });
  // }, [currentvalue]);

  useEffect(() => {
    if (
      currentvalue &&
      (firstname.inputfirstname !== firstname.first ||
        lastname.inputlastname !== lastname.last) &&
      (firstname.inputfirstname.length >= 2 ||
        lastname.inputlastname.length >= 2) &&
      (firstname.inputfirstname.length <= 10 ||
        lastname.inputlastname.length >= 10)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [currentvalue, firstname, lastname]);

  const onSubmit = () => {
    setCurrentValue(false);
    setFirstName({ ...firstname, inputfirstname: '' });
    setLastName({ ...lastname, inputlastname: '' });
  };

  return (
    <div
      className={clsx(
        'flex',
        currentvalue ? 'flex-col pb-6' : 'justify-start items-center'
      )}
    >
      {currentvalue ? (
        <>
          <SimpleInput
            label="First Name"
            value={firstname.inputfirstname}
            onChangeText={(e) => setFirstName({ inputfirstname: e, first: '' })}
            placeholder={firstname.first}
          />
          <SimpleInput
            label="Last Name"
            value={lastname.inputlastname}
            onChangeText={(e) => setLastName({ inputlastname: e, last: '' })}
            placeholder={lastname.last}
          />
        </>
      ) : (
        <h2
          className={clsx(
            bold ? 'font-medium' : null,
            'text-2xl text-gray-900 flex items-center'
          )}
        >
          {title.replace(' - ', ' ')}
        </h2>
      )}
      <EditAndSaveInfomation
        currentvalue={currentvalue}
        onClick={setCurrentValue}
        disabled={buttondisabled}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const ChangePassword = () => {
  const [currentvalue, setCurrentValue] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [oldpassword, setOldPassword] = useState({ value: '', error: '' });
  const [newpassword, setNewPassword] = useState({ value: '', error: '' });
  const [re_newpassword, setRe_NewPassword] = useState({
    value: '',
    error: '',
  });
  const { AuthService, userInfo } = useContext(AuthStateChangedContext);

  useEffect(() => {
    if (!currentvalue) {
      setOldPassword({
        value: '',
        error: '',
      });
      setNewPassword({ value: '', error: '' });
      setRe_NewPassword({ value: '', error: '' });
    }
  }, [currentvalue]);

  useEffect(() => {
    if (
      currentvalue &&
      oldpassword.value &&
      newpassword.value &&
      re_newpassword.value &&
      newpassword.value === re_newpassword.value
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    currentvalue,
    oldpassword.value,
    newpassword.value,
    re_newpassword.value,
  ]);

  const onSubmit = async () => {
    const user = await AuthService.loginUser(
      userInfo?.email ? userInfo?.email : '',
      oldpassword.value
    );
    if (user.user) {
      AuthService.updatePassword(newpassword.value);
    } else if (user.error === 'wrong-password') {
      setOldPassword({
        value: oldpassword.value,
        error: 'old password is incorrect',
      });
    }
    // else if (user.error === 'too-many-requests') {
    //   setOldPassword({
    //     value: oldpassword.value,
    //     error: 'old password is incorrect',
    //   });
    // }
  };

  return (
    <div className={clsx(currentvalue ? 'inline-block' : 'flex items-center')}>
      {!currentvalue ? (
        <span className="font-medium">Change password</span>
      ) : (
        <div>
          <SimpleInput
            label="Enter old password"
            value={oldpassword.value}
            seepassword
            onChangeText={(e) => setOldPassword({ value: e, error: '' })}
            error={oldpassword.error}
          />
          <SimpleInput
            label="Enter a new password"
            value={newpassword.value}
            seepassword
            onChangeText={(e) => setNewPassword({ value: e, error: '' })}
          />
          <SimpleInput
            label="Re-enter the new password"
            value={re_newpassword.value}
            seepassword
            onChangeText={(e) => setRe_NewPassword({ value: e, error: '' })}
          />
          <span className="text-sm text-gray-800 transition-colors cursor-pointer hover:text-gray-900">
            Forgot password?
          </span>
        </div>
      )}
      <EditAndSaveInfomation
        currentvalue={currentvalue}
        disabled={disabled}
        onClick={setCurrentValue}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const SimpleSelectProfile = {
  FullName,
  DropDown,
  ChangePassword,
};

export default SimpleSelectProfile;
