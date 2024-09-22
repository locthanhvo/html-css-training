import { ReactNode } from 'react';

interface LabelProps {
  name: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  customClass?: string;
}

const Label = ({ name, startIcon, endIcon, customClass }: LabelProps) => {
  return (
    <div className="flex w-[40%] items-center justify-start gap-2">
      {startIcon && <span>{startIcon}</span>}
      <p className={customClass}>{name}</p>
      {endIcon && <span>{endIcon}</span>}
    </div>
  );
};

export default Label;
