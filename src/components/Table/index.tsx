import { memo } from 'react';
import {
  TableContainer,
  Table as TableChakra,
  Thead,
  Tbody,
  TableProps,
} from '@chakra-ui/react';

// Types
import { TDataSource, THeaderTable } from '@/types';

// Components
import TableRow from '@/components/Table/TableRow';
import TableHead from '@/components/Table/TableHead';

type TTableProps = TableProps & {
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
  onClickTableRow?: (id: string) => void;
};

const Table = ({
  columns = [],
  dataSource = [],
  onClickTableRow,
  ...props
}: TTableProps): JSX.Element => (
  <TableContainer>
    <TableChakra {...props}>
      <Thead>
        <TableHead columns={columns} />
      </Thead>

      <Tbody>
        <TableRow
          columns={columns}
          dataSource={dataSource}
          onClickTableRow={onClickTableRow}
        />
      </Tbody>
    </TableChakra>
  </TableContainer>
);

export default memo(Table);
