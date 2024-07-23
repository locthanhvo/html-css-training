import { IIconProps } from '@/types';
import { memo } from 'react';

const CalendarIcon = ({
  w = '30',
  h = '31',
  color = '#C3CAD9',
}: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 16.5H16C15.45 16.5 15 16.95 15 17.5V20.5C15 21.05 15.45 21.5 16 21.5H19C19.55 21.5 20 21.05 20 20.5V17.5C20 16.95 19.55 16.5 19 16.5ZM19 6.5V7.5H11V6.5C11 5.95 10.55 5.5 10 5.5C9.45 5.5 9 5.95 9 6.5V7.5H8C6.89 7.5 6.01 8.4 6.01 9.5L6 23.5C6 24.6 6.89 25.5 8 25.5H22C23.1 25.5 24 24.6 24 23.5V9.5C24 8.4 23.1 7.5 22 7.5H21V6.5C21 5.95 20.55 5.5 20 5.5C19.45 5.5 19 5.95 19 6.5ZM21 23.5H9C8.45 23.5 8 23.05 8 22.5V12.5H22V22.5C22 23.05 21.55 23.5 21 23.5Z"
      fill={color}
    />
  </svg>
);

export default memo(CalendarIcon);
