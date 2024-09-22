import { TCellTable } from '@/types';
import { memo } from 'react';

interface TableCellProps {
  colorCell?: string;
  cells: TCellTable[];
}

const TableCell = ({ cells, colorCell = 'bg-darkBlue' }: TableCellProps) => {
  return (
    <tr className={`cursor-pointer ${colorCell}`}>
      {cells.map((cell) => (
        <td
          key={cell.key}
          className=" relative group p-5 text-xs text-secondary font-medium text-left border-gray-200 break-words"
        >
          {cell.content}
        </td>
      ))}
    </tr>
  );
};

export default memo(TableCell);
