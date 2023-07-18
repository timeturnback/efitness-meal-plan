import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import {
  DropDownSelect,
  SimpleInput,
  SimpleSelectInput,
} from '@/components/input';
import { Wrapper } from '@/components/pages/wrapper';
import {
  MUSCLE_EXERCISE_OPTIONS,
  MUSCLE_EXERCISES_DIFFICULTY,
  MUSCLE_EXERCISES_MUSCLE_GROUP,
  MUSCLE_EXERCISES_TYPE,
} from '@/constants/select-options';
import {
  MuscleExercisesContext,
  MuscleExercisesProvider,
} from '@/context/muscle-exercises-context';

const MuscleExercisesContainer = () => {
  return (
    <Wrapper title="Muscle Exercises">
      <div className="h-[calc(100vh-64px)] py-5">
        <div className="flex items-center h-full w-full rounded-xl border-2 border-gray-800/90 bg-zinc-100/40 px-6">
          <_Options />
          <div className="h-full w-2/5 pl-6 pr-0 py-6">
            {/* <img
              src={ImagesMuscleExercises.AnhTest.src}
              alt=""
              className="rounded-xl"
            /> */}
            <h2 className="text-2xl font-medium">
              From <span className="font-bold drop-shadow-md">nutitrion</span>{' '}
              to <span className="font-bold drop-shadow-md">exercise</span>!
            </h2>
            <span>
              We need to take care of our bodies through proper nutrition and
              mindful calorie intake. By combining regular exercise, we can
              build a well-proportioned, firm, and healthy physique. Through
              muscle training, we can increase strength and flexibility,
              bringing about a sense of confidence and great well-being.
              Dedicate time each day to perform your favorite muscle-building
              exercises, such as abdominal workouts, squats, cardio exercises,
              or yoga. Listen to your body and find a workout schedule that
              suits your preferences and availability. With patience and
              consistency, you will experience significant progress and
              improvements in both your physical and mental well-being.
              Remember, taking care of our bodies is an investment in our health
              and happiness.
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const _Options = () => {
  const { searchtype, setSearchType, Submit } = useContext(
    MuscleExercisesContext
  );
  return (
    <div className="h-full w-3/5">
      <h2 className="text-4xl font-medium drop-shadow-md py-2 text-gray-900/90">
        Muscle Exercises
      </h2>
      <SimpleSelectInput
        currentValue={searchtype}
        setCurrentValue={setSearchType}
        label="Search type:"
        options={MUSCLE_EXERCISE_OPTIONS}
      />
      <div className="flex flex-col justify-between h-[calc(100%-186px)]">
        <div>
          {searchtype === 'search' ? (
            <_SearchTypeInOptions />
          ) : (
            <_OptionstTypeInOptions />
          )}
        </div>
        <div className="mb-6">
          <SimpleButton label="Search" onClick={Submit} />
        </div>
      </div>
    </div>
  );
};

const _SearchTypeInOptions = () => {
  const { inputsearch, setInputSearch } = useContext(MuscleExercisesContext);
  return (
    <div>
      <SimpleInput
        removetext={inputsearch.value.length > 0}
        maxwidth
        search
        value={inputsearch.value}
        error={inputsearch.error}
        onChangeText={(e) => setInputSearch({ value: e, error: '' })}
      />
      <span>Example: </span>
      <span>Zottman Curl</span>
    </div>
  );
};

const _OptionstTypeInOptions = () => {
  const {
    setDropDownType,
    setDropDownDifficulty,
    setDropDownMuscleGroup,
    dropdowndifficulty,
    dropdownmusclegroup,
    dropdowntype,
  } = useContext(MuscleExercisesContext);
  return (
    <div className="grid grid-cols-2 gap-3">
      <DropDownSelect
        error={dropdowntype.error}
        label="Exercise type"
        options={MUSCLE_EXERCISES_TYPE}
        setCurrentValue={(e) => setDropDownType({ value: e, error: '' })}
      />
      <DropDownSelect
        error={dropdownmusclegroup.error}
        label="Muscle group"
        options={MUSCLE_EXERCISES_MUSCLE_GROUP}
        setCurrentValue={(e) => setDropDownMuscleGroup({ value: e, error: '' })}
      />
      <DropDownSelect
        error={dropdowndifficulty.error}
        label="Level of difficult"
        options={MUSCLE_EXERCISES_DIFFICULTY}
        setCurrentValue={(e) => setDropDownDifficulty({ value: e, error: '' })}
      />
    </div>
  );
};

const MuscleExercises = () => {
  return (
    <MuscleExercisesProvider>
      <MuscleExercisesContainer />
    </MuscleExercisesProvider>
  );
};

export default MuscleExercises;
