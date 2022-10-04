import { useState } from 'react';

import { Button } from '@/components/button';

const Index = () => {
  const [, setButton] = useState('');

  return (
    <div>
      <Button setCurrentValue={setButton} />
    </div>
  );
};
export default Index;
