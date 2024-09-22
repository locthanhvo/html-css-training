'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { NAVBAR_MENU } from '@/constants';

const Navbar = () => {
  const pathname = usePathname();

  const { id } = useParams();

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col items-start p-8 border-r-[0.6px] border-slateBlue">
        <p className="text-white text-base mb-6">Credentials</p>

        {NAVBAR_MENU.map(({ label, icon: Icon, path }) => {
          const isActive = !!pathname
            .split('/')
            .find((name) => `/${name}` === path);

          const href = id ? `/users/${id}${path}` : `/users${path}`;

          return (
            <Link key={label} href={href}>
              <button
                key={label}
                className={`${
                  isActive ? 'text-white bg-darkBlue' : 'text-secondary'
                } flex items-center gap-2 text-sm font-normal p-3 w-[250px] text-start`}
              >
                <Icon /> {label}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
