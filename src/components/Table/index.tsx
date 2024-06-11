import { memo, useMemo } from 'react';
import {
  TableContainer,
  Table as TableChakra,
  Thead,
  Tbody,
  TableProps,
  Tr,
  Td,
} from '@chakra-ui/react';

// Types
import { TDataSource, THeaderTable } from '@/types';

// Components
import TableRow from '@/components/Table/TableRow';
import TableHead from '@/components/Table/TableHead';
import Fallback from '@/components/Fallback';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Utils
import { processTableData } from '@/utils';

type TTableProps = TableProps & {
  isLoading?: boolean;
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
  onClickTableRow?: (id?: string) => void;
};

const Table = ({
  isLoading,
  columns = [],
  dataSource = [],
  onClickTableRow,
  ...props
}: TTableProps): JSX.Element => {
  const processedData = useMemo(
    () => processTableData(columns, dataSource),
    [columns, dataSource],
  );

  return (
    <TableContainer
      maxH={410}
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          width: 2,
        },
        '&::-webkit-scrollbar-track': {
          width: 2,
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: '24px',
        },
      }}
    >
      <TableChakra {...props}>
        <Thead>
          <TableHead columns={columns} />
        </Thead>

        <Tbody>
          {processedData.length === 0 ? (
            <Tr data-testid="table-row">
              <Td
                colSpan={columns?.length}
                textAlign="center"
                fontWeight="semibold"
                border="none"
                fontSize="lg"
              >
                {isLoading ? <Fallback /> : ERROR_MESSAGES.EMPTY_DATA}
              </Td>
            </Tr>
          ) : (
            processedData.map((data) => (
              <TableRow
                key={data.id}
                cells={data.cells}
                onClick={() => onClickTableRow?.(data?.id)}
              />
            ))
          )}
        </Tbody>
      </TableChakra>
    </TableContainer>
  );
};

export default memo(Table);
