import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const FlagIcon = ({ w = '30', h = '31', color = '#C3CAD9' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.4 9.5L17.16 8.3C17.07 7.84 16.66 7.5 16.18 7.5H9C8.45 7.5 8 7.95 8 8.5V23.5C8 24.05 8.45 24.5 9 24.5C9.55 24.5 10 24.05 10 23.5V17.5H15.6L15.84 18.7C15.93 19.17 16.34 19.5 16.82 19.5H22C22.55 19.5 23 19.05 23 18.5V10.5C23 9.95 22.55 9.5 22 9.5H17.4Z"
      fill={color}
    />
  </svg>
);

export default memo(FlagIcon);
