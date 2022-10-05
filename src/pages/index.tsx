import { useState } from 'react';

import {
  INPUT_OPTIONS_AGE,
  INPUT_OPTIONS_HEIGHT,
  INPUT_OPTIONS_TEXT,
} from '@/components/constants/select-options';
import { SimpleInput } from '@/components/input/simple-input';

const Index = () => {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [text, setText] = useState('');
  return (
    <div>
      <SimpleInput
        label="Height"
        currentValue={height}
        setCurrentValue={setHeight}
        options={INPUT_OPTIONS_HEIGHT}
      />
      <SimpleInput
        label="Age"
        currentValue={age}
        setCurrentValue={setAge}
        options={INPUT_OPTIONS_AGE}
      />
      <SimpleInput
        label="Text"
        currentValue={text}
        setCurrentValue={setText}
        options={INPUT_OPTIONS_TEXT}
      />
    </div>
  );
};
export default Index;
