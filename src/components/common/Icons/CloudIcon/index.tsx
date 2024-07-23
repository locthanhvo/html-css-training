import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const CloudIcon = ({ w = '24', h = '17', color = '#C3CAD9' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 24 17" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.35 6.54C18.67 3.09 15.64 0.5 12 0.5C9.11 0.5 6.6 2.14 5.35 4.54C2.34 4.86 0 7.41 0 10.5C0 13.81 2.69 16.5 6 16.5H19C21.76 16.5 24 14.26 24 11.5C24 8.86 21.95 6.72 19.35 6.54Z"
      fill={color}
    />
  </svg>
);

export default memo(CloudIcon);
