// Types
import { IIconProps } from '@/types';
import { memo } from 'react';

const PlusCircleIcon = ({
  w = '20',
  h = '21',
  color = '#C3CAD9',
}: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 20 21" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0.5C4.48 0.5 0 4.98 0 10.5C0 16.02 4.48 20.5 10 20.5C15.52 20.5 20 16.02 20 10.5C20 4.98 15.52 0.5 10 0.5ZM14 11.5H11V14.5C11 15.05 10.55 15.5 10 15.5C9.45 15.5 9 15.05 9 14.5V11.5H6C5.45 11.5 5 11.05 5 10.5C5 9.95 5.45 9.5 6 9.5H9V6.5C9 5.95 9.45 5.5 10 5.5C10.55 5.5 11 5.95 11 6.5V9.5H14C14.55 9.5 15 9.95 15 10.5C15 11.05 14.55 11.5 14 11.5Z"
      fill={color}
    />
  </svg>
);

export default memo(PlusCircleIcon);
