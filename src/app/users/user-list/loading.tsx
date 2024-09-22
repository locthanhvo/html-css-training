const Loading = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-[177px] sm:mt-14 lg:mt-72 mb-100">
      <div className=" mb-[291px] mt-2 sm:mb-[85px] sm:mt-0 lg:mb-44">
        <div className="block p-4 m-auto w-72">
          <div className="w-full h-3 bg-gray-400 rounded-full mt-3">
            <div className="animate-loading h-full text-center text-xs text-white bg-secondary-100 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
