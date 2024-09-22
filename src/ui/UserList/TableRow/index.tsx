// Types
import { ArrowIcon } from '@/icons';
import { THeaderTable } from '@/types';
import { memo } from 'react';

interface TableHeadProps {
  columns?: THeaderTable[];
}

const TableRow = ({ columns = [] }: TableHeadProps) => {
  return (
    <tr className="bg-midNightBlue">
      {!!columns.length &&
        columns.map(({ key, title, icon, isSort }) => (
          <th key={key} className="max-w-[100px] p-4 text-left">
            <div
              className="flex items-center gap-2 text-white font-semibold text-[10px]"
              title={title}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {icon}
              {title}

              {isSort && (
                <div className="flex flex-col items-center">
                  <ArrowIcon rotate="90deg" width={8} height={8} />
                  <ArrowIcon rotate="270deg" width={8} height={8} />
                </div>
              )}
            </div>
          </th>
        ))}
    </tr>
  );
};

export default memo(TableRow);
