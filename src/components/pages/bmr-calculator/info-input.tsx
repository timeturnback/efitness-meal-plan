import { useContext } from 'react';

import { SimpleInput, SimpleSelectInput } from '@/components/input';
import { GENDER_OPTIONS } from '@/constants/select-options';
import { BMRContext } from '@/context/bmr-context';

export const InfoInput = () => {
  const {
    gender,
    setGender,
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
  } = useContext(BMRContext);
  return (
    <div>
      <div className="my-5">
        <SimpleSelectInput
          label="Gender"
          currentValue={gender.value}
          error={gender.error}
          setCurrentValue={(e) => setGender({ value: e, error: '' })}
          options={GENDER_OPTIONS}
        />
      </div>
      <div className="my-5">
        <SimpleInput
          label="Age"
          type="number"
          value={age.value}
          error={age.error}
          onChangeText={(e) => setAge({ value: e, error: '' })}
          maxvalue={2}
          placeholder="Ex: 20"
        />
      </div>
      <div className="my-5">
        <SimpleInput
          label="Height"
          type="number"
          unit="cm"
          value={height.value}
          error={height.error}
          onChangeText={(e) => setHeight({ value: e, error: '' })}
          maxvalue={3}
          placeholder="Ex: 175"
        />
      </div>
      <div className="my-5">
        <SimpleInput
          label="Weight"
          type="number"
          unit="kg"
          value={weight.value}
          error={weight.error}
          onChangeText={(e) => setWeight({ value: e, error: '' })}
          maxvalue={3}
          placeholder="Ex: 62"
        />
      </div>
    </div>
  );
};
