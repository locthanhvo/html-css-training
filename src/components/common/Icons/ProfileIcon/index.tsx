import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const ProfileIcon = ({ w = '28', h = '29', color = '#C3CAD9' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 28 29" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 14.5C16.0627 14.5 17.7333 12.8293 17.7333 10.7667C17.7333 8.70399 16.0627 7.03333 14 7.03333C11.9373 7.03333 10.2667 8.70399 10.2667 10.7667C10.2667 12.8293 11.9373 14.5 14 14.5ZM14 16.3667C11.508 16.3667 6.53333 17.6173 6.53333 20.1V21.0333C6.53333 21.5467 6.95333 21.9667 7.46666 21.9667H20.5333C21.0467 21.9667 21.4667 21.5467 21.4667 21.0333V20.1C21.4667 17.6173 16.492 16.3667 14 16.3667Z"
      fill={color}
    />
  </svg>
);

export default memo(ProfileIcon);
