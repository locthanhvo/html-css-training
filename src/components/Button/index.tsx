import { ReactNode } from 'react';

type ButtonProps = {
  title: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md';
  customClass?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({
  title,
  startIcon,
  endIcon,
  type = 'button',
  size = 'sm',
  customClass,
  name,
  value,
  ariaLabel,
  disabled,
  onClick,
}: ButtonProps) => {
  const baseClass = `flex items-center justify-center rounded p-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`;
  let stateClass = '';

  switch (size) {
    case 'sm':
      stateClass =
        'bg-primary text-white hover:bg-fuchsia-500 disabled:bg-fuchsia-400';
      break;
    case 'md':
      stateClass =
        'bg-[linear-gradient(to_right,_#CB3CFF_20%,_#7F25FB_80%)] text-white disabled:not-allowed';
      break;
  }

  return (
    <button
      type={type}
      name={name}
      value={value}
      aria-label={ariaLabel}
      className={[baseClass, stateClass, customClass].join(' ')}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {title}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
