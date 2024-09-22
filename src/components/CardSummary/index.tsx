import { ReactNode } from 'react';

// Icons
import { DotsThreeIcon } from '@/icons';

interface CardSummaryProps {
  icon?: ReactNode;
  title: string;
  total: number;
}

const CardSummary = ({ icon, title, total }: CardSummaryProps) => {
  return (
    <div className="w-full bg-midNightBlue flex gap-3 p-5 rounded-lg">
      {icon && <span>{icon}</span>}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col">
          <span className="text-base text-white font-medium">{title}</span>
          <span className="text-xs text-secondary ">{total}</span>
        </div>
        <DotsThreeIcon />
      </div>
    </div>
  );
};

export default CardSummary;
