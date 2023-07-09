import clsx from 'clsx';
import type { SetStateAction } from 'react';
import { useContext, useEffect, useState } from 'react';
import { FaBirthdayCake, FaPen } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { AuthStateChangedContext } from '@/context/auth-state-changed-context';
import { AuthService } from '@/hooks/useAuth';
import { selector } from '@/redux';

import type { SelectOptionObject } from '../../constants/select-options';
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
  const [firstname, setFirstName] = useState({
    inputfirstname: '',
    first: useraccountinfo.fullname.split(' - ')[0],
  });
  const [lastname, setLastName] = useState({
    inputlastname: '',
    last: useraccountinfo.fullname.split(' - ')[1],
  });

  useEffect(() => {
    setFirstName({
      ...firstname,
      first: useraccountinfo.fullname.split(' - ')[0],
    });
    setLastName({
      ...lastname,
      last: useraccountinfo.fullname.split(' - ')[1],
    });
  }, [currentvalue]);

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

const Birthday = () => {
  const [currentvalue, setCurrentValue] = useState(false);
  const [buttondisabled, setButtonDisabled] = useState(true);
  const [listyear, setListYear] = useState<SelectOptionObject[]>([]);
  const [listmonth, setListMonth] = useState<SelectOptionObject[]>([]);
  const [listday, setListDay] = useState<SelectOptionObject[]>([]);
  const { dateofbirth } = useContext(AuthStateChangedContext);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2000);

  const dispatch = useDispatch();

  const { users } = useSelector(selector.food);

  const _onCreateArrayDateOfBirth = async (
    startingValue: number,
    endValue: number,
    setCurrentsValue: (value: SetStateAction<SelectOptionObject[]>) => void
  ) => {
    setCurrentsValue([]);
    const newArray: SelectOptionObject[] = [];
    // eslint-disable-next-line consistent-return
    const createArray = async (i: number): Promise<void> => {
      if (i <= endValue) {
        const item: SelectOptionObject = {
          label: i.toString(),
          value: i.toString(),
        };
        await new Promise((resolve) => setTimeout(resolve, 0));
        newArray.push(item);
        await createArray(i + 1);
      }
    };
    await createArray(startingValue);
    setCurrentsValue(newArray);
  };

  useEffect(() => {
    const newyear = new Date().getFullYear();
    (async () => {
      await _onCreateArrayDateOfBirth(1950, newyear, setListYear);
      await _onCreateArrayDateOfBirth(1, 12, setListMonth);
      await _onCreateArrayDateOfBirth(1, 31, setListDay);
    })();
  }, []);

  useEffect(() => {
    if (year && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      _onCreateArrayDateOfBirth(1, 29, setListDay);
    } else if (month === 2) {
      if (day >= 28) {
        setDay(28);
        _onCreateArrayDateOfBirth(1, 28, setListDay);
      }
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
      _onCreateArrayDateOfBirth(1, 30, setListDay);
    } else {
      _onCreateArrayDateOfBirth(1, 31, setListDay);
    }
  }, [day, month, year]);

  useEffect(() => {
    // setButtonDisabled(false);
    if (users.date_of_birth) {
      const [dateday, datemonth, dateyear] = users.date_of_birth.split('/');
      if (
        day !== parseInt(dateday!, 10) ||
        month !== parseInt(datemonth!, 10) ||
        year !== parseInt(dateyear!, 10)
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [day, month, year, users.date_of_birth]);

  const onSubmit = () => {
    dispatch({
      type: 'infousers',
      payload: {
        date_of_birth: `${day}/${month}/${year}`,
      },
    });
    setCurrentValue(false);
  };
  return (
    <div className="inline-block">
      <div className="flex items-center justify-center">
        {!currentvalue && <FaBirthdayCake className="text-3xl" />}
        <div
          className={clsx('flex', currentvalue ? 'flex-col' : 'items-center')}
        >
          {currentvalue ? (
            <div className="flex gap-4">
              <DropDownSelect
                label="Day"
                setCurrentValue={(e) => setDay(+e)}
                options={listday}
                defaultValue={day.toString()}
              />
              <DropDownSelect
                label="Month"
                setCurrentValue={(e) => setMonth(+e)}
                options={listmonth}
                defaultValue={month.toString()}
              />
              <DropDownSelect
                label="Year"
                setCurrentValue={(e) => setYear(+e)}
                options={listyear}
                defaultValue={year.toString()}
              />
            </div>
          ) : (
            <div className="pl-2">
              <span className="text-sm font-medium text-gray-800">
                Date Of Birth
              </span>
              <h2 className="block text-lg font-medium capitalize">
                {dateofbirth}
              </h2>
            </div>
          )}
          <div>
            <EditAndSaveInfomation
              onClick={setCurrentValue}
              currentvalue={currentvalue}
              disabled={buttondisabled}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
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

  const { useraccountinfo } = useContext(AuthStateChangedContext);

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
      useraccountinfo.email,
      oldpassword.value
    );
    if (user.user) {
      AuthService.updatePassword(user.user, newpassword.value);
    } else if (user.error === 'auth/wrong-password') {
      setOldPassword({
        value: oldpassword.value,
        error: 'old password is incorrect',
      });
    }
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
  Birthday,
  ChangePassword,
};

export default SimpleSelectProfile;
