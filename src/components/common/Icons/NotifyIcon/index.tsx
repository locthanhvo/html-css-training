import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const NotifyIcon = ({ w = '30', h = '31', color = '#C3CAD9' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.5865 25C15.6865 25 16.5865 24.1 16.5865 23H12.5865C12.5865 24.1 13.4765 25 14.5865 25ZM20.5865 19V14C20.5865 10.93 18.9465 8.36 16.0865 7.68V7C16.0865 6.17 15.4165 5.5 14.5865 5.5C13.7565 5.5 13.0865 6.17 13.0865 7V7.68C10.2165 8.36 8.58648 10.92 8.58648 14V19L7.29648 20.29C6.66648 20.92 7.10648 22 7.99648 22H21.1665C22.0565 22 22.5065 20.92 21.8765 20.29L20.5865 19Z"
      fill={color}
    />
  </svg>
);

export default memo(NotifyIcon);
