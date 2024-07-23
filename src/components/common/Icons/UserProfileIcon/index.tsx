import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const UserProCloudIcon = ({
  w = '30',
  h = '31',
  color = '#C3CAD9',
}: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 5.5C9.48 5.5 5 9.98 5 15.5C5 21.02 9.48 25.5 15 25.5C20.52 25.5 25 21.02 25 15.5C25 9.98 20.52 5.5 15 5.5ZM15 8.5C16.66 8.5 18 9.84 18 11.5C18 13.16 16.66 14.5 15 14.5C13.34 14.5 12 13.16 12 11.5C12 9.84 13.34 8.5 15 8.5ZM15 22.7C12.5 22.7 10.29 21.42 9 19.48C9.03 17.49 13 16.4 15 16.4C16.99 16.4 20.97 17.49 21 19.48C19.71 21.42 17.5 22.7 15 22.7Z"
      fill={color}
    />
  </svg>
);

export default memo(UserProCloudIcon);
