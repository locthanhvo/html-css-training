// Types
import { IIconProps } from '@/types';
import { memo } from 'react';

const WorldIcon = ({ w = '20', h = '21', color = '#C3CAD9' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 20 21" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0.5C4.48 0.5 0 4.98 0 10.5C0 16.02 4.48 20.5 10 20.5C15.52 20.5 20 16.02 20 10.5C20 4.98 15.52 0.5 10 0.5ZM9 18.43C5.05 17.94 2 14.58 2 10.5C2 9.88 2.08 9.29 2.21 8.71L7 13.5V14.5C7 15.6 7.9 16.5 9 16.5V18.43ZM15.9 15.89C15.64 15.08 14.9 14.5 14 14.5H13V11.5C13 10.95 12.55 10.5 12 10.5H6V8.5H8C8.55 8.5 9 8.05 9 7.5V5.5H11C12.1 5.5 13 4.6 13 3.5V3.09C15.93 4.28 18 7.15 18 10.5C18 12.58 17.2 14.47 15.9 15.89Z"
      fill={color}
    />
  </svg>
);

export default memo(WorldIcon);
