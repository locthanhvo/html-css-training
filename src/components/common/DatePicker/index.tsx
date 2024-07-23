import { useState, memo } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Stack,
  Text,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Controller, Control } from 'react-hook-form';

// Icons
import { ClockIcon } from '@/components/common/Icons';

// Utils
import { calculateDaysLeft } from '@/utils';

// Components
import InputField from '@/components/common/InputField';

// Types
import { IInputField, ITask } from '@/types';

interface DatePickerProps {
  control: Control<ITask>;
  variant?: 'icon' | 'button';
  onChange?: (inputField: IInputField<ITask>) => void;
}

const DatePicker = ({
  control,
  variant = 'icon',
  onChange,
}: DatePickerProps) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  return (
    <Popover>
      <PopoverTrigger>
        <Center
          gap={3}
          w={variant === 'button' ? 168 : 'none'}
          h={8}
          border={variant === 'button' ? '2px solid' : 'none'}
          borderColor="lightGray"
          borderRadius="md"
          cursor="pointer"
        >
          <Flex alignItems="center" justifyContent="center" gap={2}>
            {variant === 'icon' && <ClockIcon />}

            {variant === 'icon' && startDate && endDate && (
              <Text fontSize="sm" color="coolGray" textAlign="center">
                {calculateDaysLeft(startDate, endDate)}
              </Text>
            )}
          </Flex>
          {variant === 'button' && (
            <Text fontSize="base" color="primary" textAlign="center">
              Date
            </Text>
          )}
        </Center>
      </PopoverTrigger>
      <PopoverContent w={230}>
        <PopoverBody>
          <Stack spacing={4}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <InputField
                  label="Start Date"
                  fontSize="base"
                  color="primary"
                  border="2px solid"
                  borderColor="primary"
                  {...field}
                  onChange={(data) => {
                    setStartDate(data);
                    onChange?.({
                      field: 'startDate',
                      data,
                      isError: false,
                      onChange: field.onChange,
                    });
                  }}
                  type="date"
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <InputField
                  label="End Date"
                  fontSize="base"
                  color="primary"
                  border="2px solid"
                  borderColor="primary"
                  {...field}
                  onChange={(data) => {
                    setEndDate(data);
                    onChange?.({
                      field: 'endDate',
                      data,
                      isError: false,
                      onChange: field.onChange,
                    });
                  }}
                  type="date"
                  min={startDate}
                  isDisabled={!startDate}
                />
              )}
            />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default memo(DatePicker);
