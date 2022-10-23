import Image from 'next/image';

import type { SelectOptionFormulaEquation } from '@/components/constants/select-options';

export const SimpleEquations = ({
  option,
}: {
  option: SelectOptionFormulaEquation[];
}) => {
  return (
    <div className="inline-grid">
      {option.map((item) => (
        <div key={item.label} className="inline-block">
          {!item.gender ? (
            <div className="pt-5">
              <h2 className="font-medium">{item.label}:</h2>
              <div className="flex items-center">
                <Image src={item.image} alt={item.label} />
                <span className="pl-2">{item.value}</span>
              </div>
            </div>
          ) : (
            <div className="pt-5">
              <h2 className="font-medium">{item.label}:</h2>
              <div className="flex items-center">
                <Image
                  src={item.gender?.male.image}
                  alt={item.gender?.male.label}
                />
                <div className="pl-2">
                  <h2 className="font-medium">{item.gender?.male.label}</h2>
                  <span>{item.gender?.male.value}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Image
                  src={item.gender?.female.image}
                  alt={item.gender?.female.label}
                />
                <div className="pl-2">
                  <h2 className="font-medium">{item.gender?.female.label}</h2>
                  <span>{item.gender?.female.value}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
