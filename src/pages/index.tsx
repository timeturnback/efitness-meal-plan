import { useState } from 'react';

import { DROP_DOWN_OPTIONS } from '@/components/constants/select-options';
import { DropDownSelect } from '@/components/input';

const Index = () => {
  const [test, settest] = useState('');
  console.log('🚀 ~ file: index.tsx ~ line 6 ~ Index ~ test', test);
  return (
    <div className="p-2">
      <DropDownSelect setCurrentValue={settest} options={DROP_DOWN_OPTIONS} />
    </div>
  );
};

export default Index;
