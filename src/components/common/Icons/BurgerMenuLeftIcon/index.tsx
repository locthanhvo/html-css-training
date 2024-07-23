import { IIconProps } from '@/types';
import { memo } from 'react';

const BurgerMenuLeftIcon = ({
  w = '30',
  h = '31',
  color = '#C3CAD9',
}: IIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w}
    height={h}
    viewBox="0 0 30 31"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 21.5H11C11.55 21.5 12 21.05 12 20.5C12 19.95 11.55 19.5 11 19.5H7C6.45 19.5 6 19.95 6 20.5C6 21.05 6.45 21.5 7 21.5ZM6 10.5C6 11.05 6.45 11.5 7 11.5H23C23.55 11.5 24 11.05 24 10.5C24 9.95 23.55 9.5 23 9.5H7C6.45 9.5 6 9.95 6 10.5ZM7 16.5H17C17.55 16.5 18 16.05 18 15.5C18 14.95 17.55 14.5 17 14.5H7C6.45 14.5 6 14.95 6 15.5C6 16.05 6.45 16.5 7 16.5Z"
      fill={color}
    />
  </svg>
);

export default memo(BurgerMenuLeftIcon);
