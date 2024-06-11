import { useCallback } from 'react';

// Types
import { TPagination } from '@/types';

// Utils
import { formatPageArray } from '@/utils';

export const usePagination = <T>(
  data: TPagination<T>,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const arrOfCurrButtons: number[] = Array.from(
    { length: data?.pages || 0 },
    (_, index) => index,
  );

  const pageArray = formatPageArray({
    totalPage: data?.pages || 0,
    currentPage: data?.next ? data?.next : 1,
    arrOfCurrButtons,
  });

  const handleChangePageNumber = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleChangePage = useCallback(
    (direction: string) => {
      setCurrentPage(direction === 'prev' ? currentPage - 1 : currentPage + 1);
    },
    [currentPage, setCurrentPage],
  );

  const isDisableNext = currentPage === data?.pages || currentPage < 1;

  const isDisablePrev = currentPage <= 1;

  return {
    pageArray,
    isDisableNext,
    isDisablePrev,
    handleChangePageNumber,
    handleChangePage,
  };
};
