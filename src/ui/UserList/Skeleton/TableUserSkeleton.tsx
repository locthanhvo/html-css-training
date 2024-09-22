// Types
import { THeaderTable } from '@/types';

// Components
import TableRow from '../TableRow';

type TTableUserSkeletonProps = {
  title?: string;
  columns?: THeaderTable[];
  rows?: number;
};

const TableUserSkeleton = ({
  title = 'All Users',
  columns = [],
  rows = 10,
}: TTableUserSkeletonProps) => {
  return (
    <div className="overflow-hidden border-slateBlue border rounded-xl">
      <div className="flex items-center justify-between border-slateBlue border p-4 bg-midNightBlue">
        <h3 className="text-white font-medium">{title}</h3>
      </div>
      <table className="min-w-full border-slateBlue">
        <thead>
          <TableRow columns={columns} />
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {columns.map((_, colIndex) => (
                <td key={`colIndex-${colIndex}`} className="p-2">
                  <div className="w-full h-4 bg-gray-400 animate-pulse rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUserSkeleton;
