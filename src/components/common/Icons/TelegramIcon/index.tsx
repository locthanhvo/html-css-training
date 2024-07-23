import { IIconProps } from '@/types';
import { memo } from 'react';

const TelegramIcon = ({
  w = '30',
  h = '31',
  color = '#3361FF',
}: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none" cursor="pointer">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 18.5501L18.55 23.0126C19.2375 23.3876 19.7375 23.2001 19.9125 22.3751L22.375 10.7751C22.625 9.76256 21.9875 9.31256 21.325 9.61256L6.87498 15.1876C5.88748 15.5876 5.89998 16.1376 6.69998 16.3751L10.4125 17.5376L19 12.1251C19.4 11.8751 19.775 12.0126 19.475 12.2876L12.5 18.5501Z"
      fill={color}
    />
  </svg>
);

export default memo(TelegramIcon);
