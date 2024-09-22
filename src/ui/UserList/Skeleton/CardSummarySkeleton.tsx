import { DotsThreeIcon } from '@/icons';

const CardSummarySkeleton = () => {
  return (
    <div className="w-full bg-midNightBlue flex gap-3 p-5 rounded-lg animate-pulse">
      <div className="w-6 h-6 bg-gray-400 rounded-full" />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <div className="w-24 h-4 bg-gray-400 rounded mb-2" />

          <div className="w-12 h-3 bg-gray-400 rounded" />
        </div>
        <DotsThreeIcon />
      </div>
    </div>
  );
};

export default CardSummarySkeleton;
