import classNames from 'classnames';
import { useState } from 'react';

function GenderSelect() {
  const [clickmale, setClickMale] = useState(false);
  const [clickfemale, setClickFemale] = useState(false);
  const [click, setClick] = useState(true);

  const _onHandleGenderFemale = () => {
    if (click) {
      setClick(false);
      setClickFemale(true);
    } else {
      setClickMale(false);
      setClickFemale(true);
    }
  };
  const _onHandleGenderMale = () => {
    if (click) {
      setClick(false);
      setClickMale(true);
    } else {
      setClickFemale(false);
      setClickMale(true);
    }
  };

  return (
    <div>
      <span className="mb-3 block">Gender</span>
      <div className="flex items-center">
        <div
          className="mr-5 cursor-pointer select-none rounded-md border border-black p-3"
          onClick={_onHandleGenderMale}
        >
          <span className="relative flex items-center border-black pl-7 leading-4 before:absolute before:left-0 before:h-5 before:w-5 before:rounded-3xl before:border before:border-bl-ccc before:content-['']">
            <div
              className={classNames(
                'absolute w-3 h-3 transition-all scale-0 opacity-0 bg-bl-222 rounded-3xl left-1',
                clickmale && 'scale-100 opacity-100'
              )}
            />
            Male
          </span>
        </div>
        <div
          className="cursor-pointer select-none rounded-md border border-black p-3"
          onClick={_onHandleGenderFemale}
        >
          <span className="relative flex items-center border-black pl-7 leading-4 before:absolute before:left-0 before:h-5 before:w-5 before:rounded-3xl before:border before:border-bl-ccc before:content-['']">
            <div
              className={classNames(
                'absolute w-3 h-3 transition-all scale-0 opacity-0 bg-bl-222 rounded-3xl left-1',
                clickfemale && 'scale-100 opacity-100'
              )}
            />
            Female
          </span>
        </div>
      </div>
    </div>
  );
}

export default GenderSelect;
