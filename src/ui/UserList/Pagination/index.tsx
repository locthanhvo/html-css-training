'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Constants
import { OPTION_LIMITS } from '@/constants';

// Utils
import { getRecordRange } from '@/utils';

// Icons
import { ArrowRightIcon } from '@/icons';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  total: number;
}

const Pagination = ({ currentPage, pageSize, total }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleOnClickPagination = (page: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);

    replace(`${pathname}?${params.toString()}`);
  };

  const handleClickNextPage = () =>
    handleOnClickPagination((+currentPage + 1).toString());

  const handleClickPreviousPage = () =>
    handleOnClickPagination((+currentPage - 1).toString());

  const handleChangeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', e.target.value);

    replace(`${pathname}?${params.toString()}`);
  };

  const disableNextPage = Number(currentPage) === Math.round(total / pageSize);

  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <p className="text-white text-xs font-medium">
          {getRecordRange(currentPage, pageSize, total)} of {total}
        </p>
      </div>

      <div className="flex items-center gap-[59px]">
        <div className="flex items-center gap-2">
          <p className="text-secondary text-xs font-medium">Rows per page:</p>
          <select
            defaultValue={pageSize}
            className="bg-transparent text-iceBlue text-[10px]"
            onChange={handleChangeLimit}
          >
            {OPTION_LIMITS.map(({ value, label }) => (
              <option className="bg-white text-black" key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center gap-[7px] mr-5">
          <button
            onClick={handleClickPreviousPage}
            disabled={Number(currentPage) === 1}
            className="bg-darkBlue p-[6px] rounded-xl border border-midNightBlue disabled:text-iceBlue disabled:cursor-not-allowed"
          >
            <ArrowRightIcon
              rotate="180deg"
              color={Number(currentPage) === 1 ? '#7E89AC' : 'white'}
            />
          </button>

          <button
            onClick={handleClickNextPage}
            disabled={disableNextPage}
            className="bg-darkBlue p-[6px] rounded-xl border border-midNightBlue disabled:text-iceBlue disabled:cursor-not-allowed"
          >
            <ArrowRightIcon color={disableNextPage ? '#7E89AC' : 'white'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
