import { Options } from '@/components/pages/muscle-exercises';
import { Wrapper } from '@/components/pages/wrapper';
import { MuscleExercisesProvider } from '@/context/muscle-exercises-context';

const MuscleExercisesContainer = () => {
  return (
    <Wrapper title="Muscle Exercises">
      <div className="h-[calc(100vh-64px)] py-5">
        <div className="flex items-center h-full w-full rounded-xl border-2 border-gray-800/90 bg-zinc-100/40 px-6">
          <Options />
          <div className="h-full w-2/5 pl-6 pr-0 py-6">
            {/* <img
              src={ImagesMuscleExercises.AnhTest.src}
              alt=""
              className="rounded-xl"
            /> */}
            <h2 className="text-2xl font-medium">
              From <span className="font-bold drop-shadow-md">nutitrion</span>{' '}
              to <span className="font-bold drop-shadow-md">exercise</span>!
            </h2>
            <span>
              We need to take care of our bodies through proper nutrition and
              mindful calorie intake. By combining regular exercise, we can
              build a well-proportioned, firm, and healthy physique. Through
              muscle training, we can increase strength and flexibility,
              bringing about a sense of confidence and great well-being.
              Dedicate time each day to perform your favorite muscle-building
              exercises, such as abdominal workouts, squats, cardio exercises,
              or yoga. Listen to your body and find a workout schedule that
              suits your preferences and availability. With patience and
              consistency, you will experience significant progress and
              improvements in both your physical and mental well-being.
              Remember, taking care of our bodies is an investment in our health
              and happiness.
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const MuscleExercises = () => {
  return (
    <MuscleExercisesProvider>
      <MuscleExercisesContainer />
    </MuscleExercisesProvider>
  );
};

export default MuscleExercises;
