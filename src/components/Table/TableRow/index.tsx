import { memo } from 'react';
import { Td, Text, Tooltip, Tr } from '@chakra-ui/react';
import { TCellTable } from '@/types';

interface TableRowProps {
  cells: TCellTable[];
  onClick?: () => void;
}

const TableRow = ({ cells, onClick }: TableRowProps) => {
  return (
    <Tr
      {...(onClick && {
        cursor: 'pointer',
      })}
      onClick={onClick}
    >
      {cells.map((cell) => (
        <Td
          key={cell.key}
          p={0}
          py={5}
          px={2}
          maxW="50px"
          textAlign="left"
          borderColor="gray.150"
        >
          <Tooltip
            minW="max-content"
            placement="bottom-start"
            label={cell.tooltipLabel}
          >
            <Text
              as="span"
              fontSize="xs"
              color="gray.800"
              fontWeight="regular"
              textAlign="left"
              whiteSpace="break-spaces"
              noOfLines={1}
            >
              {cell.content}
            </Text>
          </Tooltip>
        </Td>
      ))}
    </Tr>
  );
};

export default memo(TableRow);
