import { memo } from 'react';
import { Td, Text, Tooltip, Tr } from '@chakra-ui/react';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Types
import { TDataSource, THeaderTable } from '@/types';

interface TableRowProps {
  columns?: THeaderTable[];
  dataSource?: TDataSource[];
  onClickTableRow?: (id: string) => void;
}

const TableRow = ({ columns, dataSource, onClickTableRow }: TableRowProps) => {
  return !dataSource?.length ? (
    <Tr data-testid="table-row">
      <Td
        colSpan={columns?.length}
        color="text.primary"
        fontSize="lg"
        fontWeight="regular"
        textAlign="center"
        border="none"
      >
        {ERROR_MESSAGES.EMPTY_DATA}
      </Td>
    </Tr>
  ) : (
    dataSource.map((data) => {
      const handleClick = () => onClickTableRow?.(`${data.id}`);

      return (
        <Tr
          key={data.id}
          {...(onClickTableRow && {
            cursor: 'pointer',
          })}
          onClick={handleClick}
        >
          {!!columns?.length &&
            columns?.map((column, index) =>
              column?.renderBody ? (
                column?.renderBody(data, index)
              ) : (
                <Td key={column?.key} px={0} borderColor="gray.150">
                  <Tooltip
                    minW="max-content"
                    placement="bottom-start"
                    label={data[column?.key as keyof typeof data] as string}
                  >
                    <Text
                      fontSize="xs"
                      color="gray.800"
                      fontWeight="regular"
                      textAlign="left"
                      whiteSpace="break-spaces"
                      noOfLines={1}
                    >
                      {data[column?.key as keyof typeof data] as string}
                    </Text>
                  </Tooltip>
                </Td>
              ),
            )}
        </Tr>
      );
    })
  );
};

export default memo(TableRow);
