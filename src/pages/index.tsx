import { useState } from 'react';

import { Input } from '@/components/input/simple-input';

const Index = () => {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [text, setText] = useState('');
  return (
    <div className="p-2">
      <span className="py-2 font-medium">Height</span>
      <div className="pb-8">
        <Input
          type="number"
          unit="cm"
          placeholder="Ex: 180"
          value={height}
          onChange={setHeight}
          notify="Please enter the correct height"
          maxvalue={3}
        />
      </div>
      <span className="py-2 font-medium">Age</span>
      <div className="pb-12">
        <Input
          type="number"
          unit=""
          placeholder="Ex: 21"
          value={age}
          onChange={setAge}
          notify="Please enter the correct age number"
          maxvalue={2}
        />
      </div>
      <span className="py-2 font-medium">Text</span>
      <div className="pb-8">
        <Input
          type="text"
          unit=""
          placeholder=""
          value={text}
          onChange={setText}
          notify=""
          maxvalue={180}
        />
      </div>
    </div>
  );
};

export default Index;
