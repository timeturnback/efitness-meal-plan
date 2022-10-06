import { Button } from '@/components/button';

const Index = () => {
  const handle = () => {
    console.log('a');
  };
  return <Button value="Calculate" onClick={handle} />;
};

export default Index;
