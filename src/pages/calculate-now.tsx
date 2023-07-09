import Link from 'next/link';
import { useContext } from 'react';

import { SimpleButton } from '@/components/button';
import { CALCULATE_NOW_OPTIONS } from '@/constants/select-options';
import { MainContext } from '@/context/main-context';

const CalculateNow = () => {
  const { calculatenow } = useContext(MainContext);
  return (
    <div className="w-full h-screen max-w-5xl mx-auto">
      <div className="flex items-center justify-center w-full h-full">
        {calculatenow ? <FormError /> : <ActiveForm />}
      </div>
    </div>
  );
};

const ActiveForm = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h2 className="pb-10 text-4xl font-medium text-center text-gray-900">
        What do you need to calculate?
      </h2>
      <div className="flex justify-center w-full gap-5">
        {CALCULATE_NOW_OPTIONS.map((item) => (
          <Link href={item.to} key={item.value}>
            <div className="flex flex-col justify-between p-3 transition-all bg-white border rounded-lg shadow-md cursor-pointer w-72 drop-shadow-md hover:bg-gray-200/80 hover:drop-shadow-xl">
              <h2 className="text-3xl font-medium text-center text-gray-900 drop-shadow-md">
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
      <div className="flex justify-center w-full pt-6">
        <div className="w-8/12">
          <SimpleButton label="Back to the home page" to="/" />
        </div>
      </div>
    </div>
  );
};

export default CalculateNow;
