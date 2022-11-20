export const ResultCalories = ({ bmr }: { bmr: number }) => {
  return (
    <div className="w-3/4 py-4 text-gray-800">
      <div className="px-7">
        <h2 className="text-2xl font-medium">Your Result</h2>
        <span>
          All are in <strong className="font-medium">calories/day</strong>
        </span>
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-medium">Maintain weight:</h3>
          <span className="text-4xl font-bold uppercase text-gray-900 drop-shadow-md">
            {bmr} cal
          </span>
        </div>
        <div className="grid gap-6">
          <div>
            <h3 className="text-lg font-medium">Weight loss:</h3>
            <div className="flex justify-between gap-2 py-4">
              <CaloriesTable
                cal={bmr - 250}
                label="Light weight loss"
                kg={0.25}
              />
              <CaloriesTable cal={bmr - 500} label="Weight loss" kg={0.5} />
              <CaloriesTable
                cal={bmr - 1000}
                label="Extreme weight loss"
                kg={1}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Weight gain:</h3>
            <div className="flex justify-between gap-2 py-4">
              <CaloriesTable
                cal={bmr + 250}
                label="Light weight gain"
                kg={0.25}
              />
              <CaloriesTable cal={bmr + 500} label="Weight gain" kg={0.5} />
              <CaloriesTable
                cal={bmr + 1000}
                label="Rapid weight gain"
                kg={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaloriesTable = ({
  cal,
  label,
  kg,
}: {
  cal: number;
  label: string;
  kg: number;
}) => {
  return (
    <div className="flex w-28 flex-col justify-between rounded-lg p-2 text-center shadow-md">
      <div className="leading-5">
        <h3 className="h-10 font-medium">{label}</h3>
        <span className="text-xs">
          <strong className="text-sm text-gray-900 drop-shadow-md">{kg}</strong>{' '}
          kg/week
        </span>
      </div>
      <h2 className="pt-3 text-xl font-bold text-gray-900 drop-shadow-md">
        {cal} CAL
      </h2>
    </div>
  );
};
