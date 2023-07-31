import clsx from 'clsx';
import { useContext } from 'react';

import { DropDownSelect } from '@/components/input';
import {
  MUSCLE_EXERCISES_BODYPARTS,
  MUSCLE_EXERCISES_EQUIPMENT,
  MUSCLE_EXERCISES_TARGET,
} from '@/constants/select-options';
import { MuscleExercisesContext } from '@/context/muscle-exercises-context';

export const OptionstTypeInOptions = () => {
  const {
    setDropDownBodyParts,
    setDropDownEquipment,
    setDropDownTarget,
    dropdownequipment,
    dropdowntarget,
    dropdownbodyparts,
  } = useContext(MuscleExercisesContext);
  return (
    <div className="grid grid-cols-2 gap-3">
      <DropDownSelect
        error={dropdownbodyparts.error}
        label="BodyParts"
        options={MUSCLE_EXERCISES_BODYPARTS}
        setCurrentValue={(e) => setDropDownBodyParts({ value: e, error: '' })}
      />
      <DropDownSelect
        error={dropdowntarget.error}
        label="Target Muscle"
        options={MUSCLE_EXERCISES_TARGET}
        setCurrentValue={(e) => setDropDownTarget({ value: e, error: '' })}
      />
      <DropDownSelect
        error={dropdownequipment.error}
        label="Equipment"
        options={MUSCLE_EXERCISES_EQUIPMENT}
        setCurrentValue={(e) => setDropDownEquipment({ value: e, error: '' })}
      />
      <RenderNumberOfDisplays />
    </div>
  );
};

const RenderNumberOfDisplays = () => {
  const { numberofdisplays, setNumberOfDisplays } = useContext(
    MuscleExercisesContext
  );
  return (
    <div className="relative w-auto">
      <span className="font-medium text-gray-800">
        Number of displays for each option
      </span>
      <div className="h-12 bg-white rounded-md shadow-md mt-3 flex items-center justify-center">
        <div
          onClick={() =>
            setNumberOfDisplays({
              number: '10',
              value: 'options',
              error: false,
            })
          }
          className={clsx(
            'h-full w-full px-2 py-1 border rounded-md mr-1 cursor-pointer group',
            numberofdisplays.value === 'options' ? 'bg-slate-300/80' : null
          )}
        >
          <input
            onChange={(e) =>
              setNumberOfDisplays({
                number: e.target.value,
                value: 'options',
                error: false,
              })
            }
            className={clsx(
              'border-2 rounded-lg h-full w-full drop-shadow-sm text-center group-hover:bg-slate-100 outline-none',
              numberofdisplays.error ? 'border-red-500' : null
            )}
            type="number"
            min={1}
            max={20}
            value={numberofdisplays.number}
            placeholder="1 - 20"
          />
        </div>
        <div
          onClick={() =>
            setNumberOfDisplays({ number: '', value: 'all', error: false })
          }
          className={clsx(
            'h-full w-full px-2 py-1 border rounded-md ml-1 cursor-pointer group',
            numberofdisplays.value === 'all' ? 'bg-slate-300/80' : null
          )}
        >
          <h2 className="drop-shadow-sm font-medium h-full flex items-center justify-center border-2 rounded-lg group-hover:drop-shadow-md bg-white group-hover:bg-slate-100">
            ALL
          </h2>
        </div>
      </div>
    </div>
  );
};
