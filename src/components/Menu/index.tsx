'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Icons
import { ArrowIcon } from '@/icons';

interface MenuProps {
  name: string;
  path: string;
  paths?: { id: number; name: string; destination: string }[];
  leftIcon: React.JSX.Element;
  isRightIcon: boolean;
}

const Menu = ({ name, path, paths, leftIcon, isRightIcon }: MenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const renderSubMenu = () => {
    return paths?.map(({ id, name, destination }) => {
      const isActive = `/users${destination}` === pathname;
      return (
        <Link key={id} href={`/users${destination}`}>
          <div className="w-full mt-2 px-4 py-2 hover:bg-blue-950 hover:border-l-4 hover:border-primary rounded-sm">
            <p
              className={`w-full ${isActive ? 'text-primary' : 'text-secondary'} text-sm font-medium hover:text-white`}
            >
              {name}
            </p>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full p-4">
        <Link href={path}>
          <button
            className="flex w-full items-center justify-between gap-2"
            onClick={handleToggle}
          >
            <div className="flex items-center gap-2">
              {leftIcon}
              <p
                className={`${isExpanded ? 'text-primary' : 'text-secondary'} text-sm font-medium`}
              >
                {name}
              </p>
            </div>
            {isRightIcon && (
              <ArrowIcon rotate={isExpanded ? '270deg' : '180deg'} />
            )}
          </button>
        </Link>

        {isExpanded && renderSubMenu()}
      </div>
    </div>
  );
};

export default Menu;
