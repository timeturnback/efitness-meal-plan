export const ResultBMR = ({ bmr, tdee }: { bmr: number; tdee: number }) => {
  return (
    <div className="w-3/4 py-4 text-gray-800">
      <div className="px-7">
        <h2 className="text-2xl font-medium">Your Result</h2>
        <span>
          All are in <strong className="font-medium">calories/day</strong>
        </span>
        <ContentSpan label="BMR">{bmr}</ContentSpan>
        <ContentSpan label="TDEE">{tdee}</ContentSpan>
      </div>
    </div>
  );
};

const ContentSpan = ({
  children,
  label,
}: {
  children: number;
  label: string;
}) => {
  return (
    <div className="flex items-center justify-between py-5">
      <h3 className="text-2xl font-medium">You {label} is:</h3>
      <span className="text-4xl font-bold uppercase text-gray-900 drop-shadow-md">
        {children} <span className="text-3xl">cal</span>
      </span>
    </div>
  );
};
