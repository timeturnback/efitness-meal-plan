import { DESCRIBE_LEVEL_AND_SUGGEST_FOOD } from '@/constants/select-options';

export const DescribeLevelAndSuggestFoods = ({
  value,
  level,
}: {
  value: number;
  level: string;
}) => {
  return (
    <div className="h-full">
      <h2 className="text-lg mb-5">
        Your body fat percentage is{' '}
        <span className="font-medium">{value}%</span> and you fall into the{' '}
        <span className="font-medium">{level}</span> category. Here is a
        description of this category and the essential foods for you.
      </h2>
      <RenderContent value={level.toLowerCase()} />
    </div>
  );
};

const RenderContent = ({ value }: { value: string }) => {
  return (
    <div>
      {DESCRIBE_LEVEL_AND_SUGGEST_FOOD.map((item) => {
        return item.value === value ? (
          <div key={item.value} className="flex flex-col gap-2">
            <p>
              <span className="font-medium">Level description: </span>
              {item.description}
            </p>
            <p>
              <span className="font-medium">Foods: </span>
              {item.foods}
            </p>
            <p>
              <span className="font-medium">Fruits: </span>
              {item.fruits}
            </p>
          </div>
        ) : null;
      })}
    </div>
  );
};
