import { ImagesComposite } from '@/components/Images/composite-images';

export const SimpleBulletinBoard = () => {
  return (
    <div className="absolute z-50 flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-auto h-auto p-8 bg-gray-200 rounded-lg shadow drop-shadow-md">
        <img
          src={ImagesComposite.checkmark.src}
          alt=""
          className="w-24 h-24 drop-shadow-md"
        />
        <h2 className="pt-3 text-xl font-medium drop-shadow-md">
          Change password successfully
        </h2>
      </div>
    </div>
  );
};
