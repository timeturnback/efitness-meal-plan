// import { useRouter } from 'next/router';
import { useState } from 'react';

import { GENDER_OPTIONS } from '@/components/constants/select-options';
import { SimpleSelectInput } from '@/components/input/simple-select-input';

const Index = () => {
  // const router = useRouter();
  const [gender, setGender] = useState('');

  return (
    <SimpleSelectInput
      label="Gender"
      setCurrentValue={setGender}
      currentValue={gender}
      options={GENDER_OPTIONS}
      column={true}
    />
  );
};
export default Index;
