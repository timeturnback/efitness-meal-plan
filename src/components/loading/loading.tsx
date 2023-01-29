import imageloading from './loading.png';

export function SimpleLoading() {
  return (
    <>
      <div className="fixed z-50 w-full h-full bg-gray-400 opacity-60"></div>
      <div className="absolute flex items-center justify-center w-full h-full">
        <img
          src={imageloading.src}
          alt="Loading..."
          className="z-50 h-24 animate-spin"
        />
      </div>
    </>
  );
}
