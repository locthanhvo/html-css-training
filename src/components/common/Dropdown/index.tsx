import { ChangeEvent, memo, useState, useCallback } from 'react';
import {
  Checkbox,
  CheckboxGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ISelectField, ITask } from '@/types';

interface DropdownProps {
  defaultValue?: { name: string; image?: string; value: string }[];
  options: { name: string; image?: string; value: string }[];
  name: string;
  onChange?: (selectField: ISelectField<ITask>) => void;
  field: keyof ITask;
}

const Dropdown = ({
  defaultValue = [],
  options,
  name,
  onChange,
  field,
}: DropdownProps) => {
  const [selectedOptions, setSelectedOptions] =
    useState<{ name: string; image?: string; value: string }[]>(defaultValue);

  const handleSelectOption = useCallback(
    (option: { name: string; image?: string; value: string }) => {
      setSelectedOptions((prevOptions) => {
        const newOptions = prevOptions.some(
          (item) => item.value === option.value,
        )
          ? prevOptions.filter((item) => item.value !== option.value)
          : [...prevOptions, option];
        onChange?.({
          field,
          data: newOptions,
          isError: false,
          onChange: () => {},
        });
        return newOptions;
      });
    },
    [onChange, field],
  );

  const isChecked = useCallback(
    (option: { name: string; image?: string; value: string }) =>
      selectedOptions.some((item) => item.value === option.value),
    [selectedOptions],
  );

  const handleCheckboxClick = (
    e: ChangeEvent<HTMLInputElement>,
    option: { name: string; image?: string; value: string },
  ) => {
    e.stopPropagation();
    handleSelectOption(option);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        w={168}
        border="2px solid"
        borderColor="lightGray"
        color="primary"
        fontSize="base"
      >
        {name}
      </MenuButton>
      <MenuList>
        <CheckboxGroup value={selectedOptions.map((option) => option.value)}>
          {options.map((option) => (
            <MenuItem key={option.value}>
              <Checkbox
                isChecked={isChecked(option)}
                onChange={(e) => handleCheckboxClick(e, option)}
              >
                {option.name}
              </Checkbox>
            </MenuItem>
          ))}
        </CheckboxGroup>
      </MenuList>
    </Menu>
  );
};

export default memo(Dropdown);
