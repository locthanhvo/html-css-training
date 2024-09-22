'use client';

import { useState } from 'react';

// Icons
import { DevicePhoneIcon, LetterIcon } from '@/icons';

interface ISwitchProps {
  onChange?: (value: boolean) => void;
  value?: 'in-app' | 'email';
  name?: string;
}

const Switch = ({ onChange, value = 'in-app', name }: ISwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(value !== 'in-app');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    onChange?.(isChecked);
  };

  return (
    <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white">
      <input
        title="switch"
        type="checkbox"
        className="sr-only"
        name={name}
        checked={isChecked}
        value={value}
        onChange={handleCheckboxChange}
      />
      <span
        className={`flex h-[30px] items-center justify-center gap-2 rounded-l py-[6px] px-[9px] text-xs font-medium ${
          !isChecked ? 'text-white bg-primary' : 'text-secondary bg-darkBlue'
        }`}
      >
        <DevicePhoneIcon />
        In-app
      </span>
      <span
        className={`flex h-[30px] items-center justify-center gap-2 rounded-r py-[6px] px-[9px] text-sm font-medium ${
          isChecked ? 'text-white bg-primary' : 'text-secondary bg-darkBlue'
        }`}
      >
        <LetterIcon />
        Email
      </span>
    </label>
  );
};

export default Switch;
