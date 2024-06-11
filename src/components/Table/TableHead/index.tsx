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
            <Th maxW="100px" key={key} px={2} textAlign="left" border="none">
              <Text
                color="gray.400"
                textTransform="none"
                fontWeight="medium"
                fontSize="base"
                title={title}
                whiteSpace="break-spaces"
                noOfLines={1}
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
