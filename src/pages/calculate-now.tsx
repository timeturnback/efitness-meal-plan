import Link from 'next/link';
import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { CALCULATE_NOW_OPTIONS } from '@/components/constants/select-options';
import { CalculateNowContext } from '@/context/calculate-now-context';

const CalculateNow = () => {
  const { calculatenow } = useContext(CalculateNowContext);
  return (
    <div className="mx-auto h-screen w-full max-w-5xl">
      <div className="flex h-full w-full items-center justify-center">
        {calculatenow ? <FormError /> : <ActiveForm />}
      </div>
    </div>
  );
};

const ActiveForm = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="pb-10 text-center text-4xl font-medium text-gray-900">
        What do you need to calculate?
      </h2>
      <div className="flex w-full justify-center gap-5">
        {CALCULATE_NOW_OPTIONS.map((item) => (
          <Link href={item.to} key={item.value}>
            <div className="flex w-72 cursor-pointer flex-col justify-between rounded-lg border bg-white p-3 shadow-md drop-shadow-md transition-all hover:bg-gray-200/80 hover:drop-shadow-xl">
              <h2 className="text-center text-3xl font-medium text-gray-900 drop-shadow-md">
                {item.label}
              </h2>
              <div className="flex justify-center drop-shadow-md">
                <img src={item.image} alt="" className="h-36 w-36" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-1/3 py-10">
        <SimpleButton label="Back to the home page" to="/" />
      </div>
    </div>
  );
};

const FormError = () => {
  return (
    <div>
      <h2 className="text-4xl font-medium text-gray-900">
        The form has not been executed.
      </h2>
      <div className="flex w-full justify-center pt-6">
        <div className="w-8/12">
          <SimpleButton label="Back to the home page" to="/" />
        </div>
      </div>
    </div>
  );
};

export default CalculateNow;
