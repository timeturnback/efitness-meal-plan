export const MacroCalculator = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="my-0 h-screen py-11">
        <div className="h-full w-full rounded-xl border-2 border-gray-800/90 px-6">
          <div className="h-20">
            <h2 className="py-2 text-4xl font-medium text-gray-800 ">
              Macro Calculate
            </h2>
            <div className="block h-[1.6px] w-full">
              <span className="block h-full w-full bg-gray-700" />
            </div>
          </div>
          <div className="h-[calc(100%-80px)]"></div>
        </div>
      </div>
    </div>
  );
};

export default MacroCalculator;
