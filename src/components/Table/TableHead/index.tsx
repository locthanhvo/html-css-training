import { THeaderTable } from '@/types';
import { Text, Th, Tr } from '@chakra-ui/react';
import { memo } from 'react';

interface TableHeadProps {
  columns?: THeaderTable[];
}

const TableHead = ({ columns = [] }: TableHeadProps) => {
  return (
    <Tr>
      {!!columns.length &&
        columns.map(({ key, title, renderHead }) =>
          renderHead ? (
            renderHead(`${title}`, `${key}`)
          ) : (
            <Th key={key} px={0} textAlign="left" border="none">
              <Text
                color="gray.400"
                textTransform="none"
                fontWeight="medium"
                fontSize="base"
                title={title}
              >
                {title}
              </Text>
            </Th>
          ),
        )}
    </Tr>
  );
};

export default memo(TableHead);
