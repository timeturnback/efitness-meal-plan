import { useContext } from 'react';

import { SimpleInput, SimpleSelectInput } from '@/components/input';
import { GENDER_OPTIONS } from '@/constants/select-options';
import { BodyFatContext } from '@/context/body-fat-context';

export const InfoInput = () => {
  const {
    gender,
    setGender,
    height,
    setHeight,
    hip,
    setHip,
    neck,
    setNeck,
    waist,
    setWaist,
  } = useContext(BodyFatContext);
  return (
    <div className="flex h-3/5 w-full items-start justify-between">
      <div>
        <div className="my-5">
          <SimpleSelectInput
            label="Gender"
            currentValue={gender.value}
            setCurrentValue={(e) => setGender({ value: e, error: '' })}
            options={GENDER_OPTIONS}
            error={gender.error}
          />
        </div>
        <div className="my-5">
          <SimpleInput
            label="Height"
            type="number"
            value={height.value}
            error={height.error}
            maxvalue={3}
            placeholder="Ex: 175"
            unit="cm"
            onChangeText={(e) => setHeight({ value: e, error: '' })}
          />
        </div>
        {gender.value === 'female' && (
          <div className="my-5">
            <SimpleInput
              label="Hip"
              type="number"
              value={hip.value}
              error={hip.error}
              maxvalue={3}
              placeholder="Ex: 98"
              unit="cm"
              onChangeText={(e) => setHip({ value: e, error: '' })}
            />
          </div>
        )}
      </div>
      <div>
        <div className="my-5">
          <SimpleInput
            label="Neck"
            type="number"
            value={neck.value}
            error={neck.error}
            maxvalue={3}
            placeholder="Ex: 56"
            unit="cm"
            onChangeText={(e) => setNeck({ value: e, error: '' })}
          />
        </div>
        <div className="my-5">
          <SimpleInput
            label="Waist"
            type="number"
            value={waist.value}
            error={waist.error}
            maxvalue={3}
            placeholder="Ex: 96"
            unit="cm"
            onChangeText={(e) => setWaist({ value: e, error: '' })}
          />
        </div>
      </div>
    </div>
  );
};
