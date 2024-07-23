import { memo, useCallback } from 'react';
import { Card, Flex, FormControl } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

// Types
import { IInputField, TAddTaskForm } from '@/types';

// Constants
import { TASK_SCHEMA } from '@/constants';

// Components
import ActionButton from '@/components/common/ActionButton';
import InputField from '@/components/common/InputField';
import DatePicker from '@/components/common/DatePicker';
import UploadFile from '@/components/UploadFile';

// Icons
import { CloseIcon, FlagIcon } from '@/components/common/Icons';

// Hooks
import { useUploader } from '@/hooks';

interface AddTaskFormProps {
  isLoading?: boolean;
  onSubmit?: (data: TAddTaskForm, imageFiles?: File[]) => void;
  onClose?: () => void;
}

const AddTaskForm = ({
  isLoading = false,
  onSubmit,
  onClose,
}: AddTaskFormProps) => {
  const { previewURLs, imageFiles, getRootProps, getInputProps } =
    useUploader();

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    clearErrors,
  } = useForm<TAddTaskForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      title: '',
      startDate: '',
      endDate: '',
    },
  });

  const handleInputChange = useCallback(
    ({ field, data, isError, onChange }: IInputField<TAddTaskForm>) => {
      isError && clearErrors(field);
      onChange(data);
    },
    [clearErrors],
  );

  const handleSubmitForm = useCallback(
    (data: TAddTaskForm) => {
      onSubmit?.(data, imageFiles);
    },
    [onSubmit, imageFiles],
  );

  return (
    <Card
      w={230}
      as="form"
      bg="white"
      p={4}
      gap={5}
      direction="column"
      borderRadius="md"
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Flex gap={2} alignItems="center">
        <ActionButton
          title=""
          type="button"
          rightIcon={<CloseIcon />}
          onClick={onClose}
        />
        <Controller
          name="title"
          rules={TASK_SCHEMA.TITLE}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputField
              fontSize="base"
              color="primary"
              {...field}
              onChange={(data) =>
                handleInputChange({
                  field: 'title',
                  data,
                  isError: !!error,
                  onChange: field.onChange,
                })
              }
              type="text"
              placeholder="Task name or type "
            />
          )}
        />
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Flex gap={1}>
          <ActionButton title="" type="button" rightIcon={<FlagIcon />} />

          <Controller
            name="images"
            control={control}
            render={() => (
              <FormControl>
                <UploadFile
                  previewURLs={previewURLs}
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                />
              </FormControl>
            )}
          />

          <FormControl>
            <DatePicker control={control} onChange={handleInputChange} />
          </FormControl>
        </Flex>
        <ActionButton
          type="submit"
          bgColor="royalBlue"
          isDisabled={!isValid && !isSubmitting}
          isLoading={isLoading || isSubmitting}
        />
      </Flex>
    </Card>
  );
};

export default memo(AddTaskForm);
