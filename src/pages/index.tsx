// import { useRouter } from 'next/router';
import { useState } from 'react';

import { GenderSelect } from '@/components/input/simple-select-input';

const Index = () => {
  // const router = useRouter();
  const [gender, setGender] = useState('');

  return (
    <div>
      <GenderSelect currentValue={gender} setCurrentValue={setGender} />
    </div>
  );
};
export default Index;
