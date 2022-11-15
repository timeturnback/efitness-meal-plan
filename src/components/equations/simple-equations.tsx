import Image from 'next/image';

import type { SelectOptionRecipes } from '../constants/select-options';

export const SimpleEquations = ({
  title,
  option,
}: {
  title: string;
  option: SelectOptionRecipes[];
}) => {
  return (
    <div>
      <h2 className="pt-5 pb-3 font-medium">{title}:</h2>
      {option.map((item, index) => (
        <div key={index}>
          <div className="inline-block rounded-lg p-2">
            <div className="flex items-center drop-shadow-md">
              <Image
                src={item.image}
                alt={item.gender}
                height={90}
                width={90}
              />
              <div className="px-5">
                {item.gender && <h2 className="font-medium">{item.gender}</h2>}
                <span>{item.formula}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
