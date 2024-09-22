'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Icons
import { GlassesIcon } from '@/icons';

// Components
import Input from '../Input';

const SearchBox = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      value ? params.set('search', value) : params.delete('search');

      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <Input
        placeholder="Search for..."
        onChange={handleSearch}
        defaultValue={searchParams.get('search')?.toString()}
        leftIcon={<GlassesIcon />}
        customClass="w-[352px]"
      />
    </div>
  );
};

export default SearchBox;
