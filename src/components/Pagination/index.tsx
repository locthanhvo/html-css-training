import { memo } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

// Icons
import { ArrowIcon } from '@/components/Icons';

interface PaginationProps {
  totalRecords?: string;
  pageSize?: number;
  currentPage?: number;
  isDisabledPrev?: boolean;
  isDisableNext?: boolean;
  arrOfCurrButtons?: (number | string)[];
  onPageChange?: (direction: string) => void;
  onClickPage?: (currentPage: number) => void;
}

const Pagination = ({
  totalRecords,
  currentPage = 1,
  arrOfCurrButtons = [],
  isDisabledPrev,
  isDisableNext,
  onPageChange = () => {},
  onClickPage = () => {},
}: PaginationProps) => {
  const handleNextPage = () => onPageChange('next');

  const handlePrevPage = () => onPageChange('prev');

  return (
    <Flex data-testid="pagination" justifyContent="space-between" mt={8}>
      <Flex alignItems="center">
        <Text fontSize="base" fontWeight="regular" color="gray.400">
          {totalRecords}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          data-testid="prev-button"
          width={39}
          height={39}
          fontSize="xs"
          borderRightRadius="none"
          border="1px solid"
          borderColor="gray.300"
          variant="iconSecondary"
          cursor={isDisabledPrev ? 'not-allowed' : ''}
          isDisabled={isDisabledPrev}
          onClick={handlePrevPage}
        >
          <ArrowIcon width="10" height="10" isExpanded={false} rotate="90deg" />
        </Button>
        <Flex alignItems="center">
          {arrOfCurrButtons.map((item: string | number) => {
            const isDots = item.toString() === '...';
            const isDisable = currentPage === item || isDots;
            const hoverStyle = isDots
              ? {}
              : {
                  color: 'primary',
                  bg: 'blue.200',
                };
            const disableStyle = isDots
              ? {}
              : {
                  cursor: currentPage === item ? 'not-allowed' : '',
                  color: 'primary',
                  bg: 'blue.200',
                };
            const handleClickPage = () => onClickPage(item as number);

            return (
              <Button
                key={item}
                isDisabled={isDisable}
                borderRadius="none"
                fontSize="xs"
                border="1px solid"
                borderColor="gray.300"
                w="39px"
                h="38px"
                bg={currentPage === item ? 'blue.200' : 'primary'}
                color={currentPage === item ? 'primary' : 'gray.800'}
                {...(isDots && { cursor: 'not-allowed' })}
                _hover={hoverStyle}
                _disabled={disableStyle}
                onClick={handleClickPage}
              >
                {item}
              </Button>
            );
          })}
        </Flex>
        <Button
          data-testid="next-button"
          variant="iconSecondary"
          cursor={isDisableNext ? 'not-allowed' : ''}
          isDisabled={isDisableNext}
          onClick={handleNextPage}
          width={39}
          height={39}
          fontSize="xs"
          borderLeftRadius="none"
          border="1px solid"
          borderColor="gray.300"
        >
          <ArrowIcon
            width="10"
            height="10"
            isExpanded={false}
            rotate="-90deg"
          />
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(Pagination);
