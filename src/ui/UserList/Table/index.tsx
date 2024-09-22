import { useMemo } from 'react';

// Types
import { TDataSource, THeaderTable } from '@/types';

// Components
import TableRow from '../TableRow';
import TableCell from '../TableCell';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { getRecordRange, processTableData } from '@/utils';

type TTableProps = {
  title?: string;
  currentPage: number;
  pageSize: number;
  total: number;
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
};

const Table = ({
  title = 'All Users',
  currentPage,
  pageSize,
  total,
  columns = [],
  dataSource = [],
}: TTableProps) => {
  const processedData = useMemo(
    () => processTableData(columns, dataSource),
    [columns, dataSource],
  );

  return (
    <div className="overflow-hidden border-slateBlue border rounded-xl">
      <div className="flex items-center justify-between border-slateBlue border p-4 bg-midNightBlue">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-white text-xs font-medium">
          <span className="text-primary">
            {getRecordRange(currentPage, pageSize, total)}
          </span>{' '}
          of {total}
        </p>
      </div>
      <table className="min-w-full border-slateBlue">
        <thead>
          <TableRow columns={columns} />
        </thead>

        <tbody>
          {processedData?.length === 0 ? (
            <tr>
              <td
                colSpan={columns?.length}
                className="text-center text-white font-semibold text-lg border-none"
              >
                {ERROR_MESSAGES.EMPTY_DATA}
              </td>
            </tr>
          ) : (
            processedData.map((data, index) => (
              <TableCell
                colorCell={index % 2 !== 0 ? 'bg-darkBlue' : 'bg-midNightBlue'}
                key={data.id}
                cells={data.cells}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
