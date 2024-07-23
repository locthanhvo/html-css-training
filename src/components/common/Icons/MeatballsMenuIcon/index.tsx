import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const MeatballsMenuIcon = ({
  w = '16',
  h = '5',
  color = '#C3CAD9',
}: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 16 5" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.39999 0.633331C1.37333 0.633331 0.533325 1.47333 0.533325 2.5C0.533325 3.52666 1.37333 4.36666 2.39999 4.36666C3.42666 4.36666 4.26666 3.52666 4.26666 2.5C4.26666 1.47333 3.42666 0.633331 2.39999 0.633331ZM13.6 0.633331C12.5733 0.633331 11.7333 1.47333 11.7333 2.5C11.7333 3.52666 12.5733 4.36666 13.6 4.36666C14.6267 4.36666 15.4667 3.52666 15.4667 2.5C15.4667 1.47333 14.6267 0.633331 13.6 0.633331ZM7.99999 0.633331C6.97333 0.633331 6.13333 1.47333 6.13333 2.5C6.13333 3.52666 6.97333 4.36666 7.99999 4.36666C9.02666 4.36666 9.86666 3.52666 9.86666 2.5C9.86666 1.47333 9.02666 0.633331 7.99999 0.633331Z"
      fill={color}
    />
  </svg>
);

export default memo(MeatballsMenuIcon);
