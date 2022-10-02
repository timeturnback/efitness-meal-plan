import { useState } from 'react';

import { Button } from '@/components/button';
import { GenderSelect } from '@/components/input/simple-select-input';

const Index = () => {
  const [gender, setGender] = useState('');
  const [, setButton] = useState('');

  return (
    <div>
      <GenderSelect currentValue={gender} setCurrentValue={setGender} />
      <Button setCurrentValue={setButton} />
    </div>
  );
};
export default Index;
