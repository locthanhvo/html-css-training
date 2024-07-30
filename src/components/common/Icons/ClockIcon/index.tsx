import { memo } from 'react';

// Types
import { IIconProps } from '@/types';

const ClockIcon = ({ w = '30', h = '31', color = '#C3CAD9' }: IIconProps) => (
  <svg width={w} height={h} viewBox="0 0 30 31" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.4064 18.5314L15.0364 16.5314V12.0014C15.0364 11.6014 14.7164 11.2814 14.3164 11.2814H14.2564C13.8564 11.2814 13.5364 11.6014 13.5364 12.0014V16.7214C13.5364 17.0714 13.7164 17.4014 14.0264 17.5814L17.6764 19.7714C18.0164 19.9714 18.4564 19.8714 18.6564 19.5314C18.8664 19.1814 18.7564 18.7314 18.4064 18.5314ZM23.7164 8.29139L20.6364 5.73139C20.2164 5.38139 19.5864 5.43139 19.2264 5.86139C18.8764 6.28139 18.9364 6.91139 19.3564 7.27139L22.4264 9.83139C22.8464 10.1814 23.4764 10.1314 23.8364 9.70139C24.1964 9.28139 24.1364 8.65139 23.7164 8.29139ZM6.63638 9.83139L9.70638 7.27139C10.1364 6.91139 10.1964 6.28139 9.83638 5.86139C9.48638 5.43139 8.85638 5.38139 8.43638 5.73139L5.35638 8.29139C4.93638 8.65139 4.87638 9.28139 5.23638 9.70139C5.58638 10.1314 6.21638 10.1814 6.63638 9.83139ZM14.5364 7.28139C9.56638 7.28139 5.53638 11.3114 5.53638 16.2814C5.53638 21.2514 9.56638 25.2814 14.5364 25.2814C19.5064 25.2814 23.5364 21.2514 23.5364 16.2814C23.5364 11.3114 19.5064 7.28139 14.5364 7.28139ZM14.5364 23.2814C10.6764 23.2814 7.53638 20.1414 7.53638 16.2814C7.53638 12.4214 10.6764 9.28139 14.5364 9.28139C18.3964 9.28139 21.5364 12.4214 21.5364 16.2814C21.5364 20.1414 18.3964 23.2814 14.5364 23.2814Z"
      fill={color}
    />
  </svg>
);

export default memo(ClockIcon);
