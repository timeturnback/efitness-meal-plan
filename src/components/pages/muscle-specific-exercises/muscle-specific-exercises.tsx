import { SimpleButton } from '@/components/button';
import { ImagesMuscleSpecificExercises } from '@/components/Images/muscle-specific-exercises';

export const MuscleSpecificExercisesHome = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <img
        className="w-3/5 pr-20"
        src={ImagesMuscleSpecificExercises.Background.src}
        alt=""
      />
      <div>
        <h2 className="text-5xl font-bold drop-shadow-md">
          From nutrition to exercise!
        </h2>
        <span className="text-lg">
          Let&apos;s build your ideal physique and cultivate health for your
          body with muscle exercises.
        </span>
        <div className="w-80 mt-6">
          <SimpleButton
            label="Get started right away!"
            to="muscle-specific-exercises"
          />
        </div>
      </div>
    </div>
  );
};
