export const DescribeLevelAndSuggestFoods = () => {
  return (
    <div className="h-full">
      <h2 className="text-lg">
        Your body fat percentage is{' '}
        <span className="font-medium">{'{value}'}%</span> and you fall into the{' '}
        <span className="font-medium">{'{level} ex:Average'}</span> category.
        Here is a description of this category and the essential foods for you.
      </h2>
    </div>
  );
};
