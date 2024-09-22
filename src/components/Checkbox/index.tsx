'use client';

import { ChangeEvent } from 'react';

interface CheckboxProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  value?: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

const Checkbox = ({
  title,
  content,
  value = '',
  checked = false,
  icon,
  onChange,
}: CheckboxProps) => {
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e.target.value);
  };

  return (
    <div>
      <input
        type="radio"
        id={value}
        name="payment"
        value={value}
        defaultChecked={checked}
        className="hidden peer"
        onChange={handleChangeValue}
        title="checkbox"
      />
      <label
        htmlFor={value}
        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:bg-midNightBlue dark:border-gray-700 peer-checked:border-denimBlue peer-checked:bg-lightBlue"
      >
        <div className="flex items-center gap-2">
          {icon}
          <div className="flex flex-col text-[10px] text-white">
            {title}
            <span className="text-secondary">{content}</span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
