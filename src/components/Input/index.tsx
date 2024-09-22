'use client';

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

// Components
import { Label } from '@/components';

type TInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  labelStartIcon?: ReactNode;
  labelEndIcon?: ReactNode;
  leftIcon?: ReactNode;
  customClass?: string;
  onChange?: (value: string) => void;
};

const Input = (
  {
    isError = false,
    errorMessage = 'Default error',
    label,
    leftIcon,
    labelStartIcon,
    labelEndIcon,
    customClass,
    onChange,
    ...rest
  }: TInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full flex items-start justify-between">
      {label && (
        <Label
          name={label}
          startIcon={labelStartIcon}
          endIcon={labelEndIcon}
          customClass="text-xs text-white font-medium"
        />
      )}
      <div className="w-full relative flex items-center">
        {leftIcon && (
          <span className="absolute left-0 inset-y-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <div className="w-full">
          <input
            className={`${customClass} p-[14px] block text-xs text-secondary bg-midNightBlue rounded-md border ${isError ? 'border-red-500' : 'border-slateBlue'} ${
              leftIcon ? 'pl-10' : ''
            }`}
            type="text"
            onChange={handleChangeValue}
            {...rest}
            ref={ref}
          />
          {isError && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Input);
