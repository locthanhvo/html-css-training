import { memo, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

// Components
import { InputField, ActionButton, TextareaField } from '@/components';

// Types
import { TControl } from '@/types';

// Utils
import { formatDateString } from '@/utils';

// Constants
import { CONTROL_SCHEMA } from '@/constants';

interface ControlFormProps {
  title?: string;
  isEdit?: boolean;
  isLoading?: boolean;
  initialValues?: TControl;
  onSubmit: (data: TControl) => void;
  onCancel?: () => void;
}

const ControlForm = ({
  title = 'Add Control Teams',
  initialValues,
  isLoading = false,
  isEdit = false,
  onSubmit,
  onCancel,
}: ControlFormProps) => {
  const {
    control,
    formState: { isSubmitting, isValid, isDirty },
    handleSubmit,
    clearErrors,
  } = useForm<TControl>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
      createdAt:
        formatDateString(initialValues?.createdAt) ||
        formatDateString(new Date().toISOString()),
      updatedAt:
        formatDateString(initialValues?.updatedAt) ||
        formatDateString(new Date().toISOString()),
    },
  });

  const handleInputChange = useCallback(
    ({
      field,
      data,
      isError,
      onChange,
    }: {
      field: keyof TControl;
      data: string;
      isError: boolean;
      onChange: (value: string) => void;
    }) => {
      isError && clearErrors(field);
      onChange(data);
    },
    [clearErrors],
  );

  return (
    <Flex
      as="form"
      w="full"
      pb={5}
      direction="column"
      gap={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Text fontWeight="bold" fontSize="md">
        {title}
      </Text>

      <Flex direction="column" gap={3}>
        <Controller
          key="name"
          control={control}
          rules={CONTROL_SCHEMA.NAME}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Name"
              placeholder="Please enter name"
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              isDisabled={isSubmitting}
              onChange={(data) =>
                handleInputChange({
                  field: 'name',
                  data,
                  isError: !!error,
                  onChange: field.onChange,
                })
              }
              aria-label="name"
            />
          )}
        />

        <Controller
          key="description"
          control={control}
          rules={CONTROL_SCHEMA.DESCRIPTION}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <TextareaField
              label="Description"
              placeholder="Please enter description..."
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              isDisabled={isSubmitting}
              onChange={(data) =>
                handleInputChange({
                  field: 'description',
                  data,
                  isError: !!error,
                  onChange: field.onChange,
                })
              }
              aria-label="name"
            />
          )}
        />
      </Flex>

      <Flex gap={3} mt={10}>
        <ActionButton
          type="submit"
          size="lg"
          title={isEdit ? 'Update' : 'Create'}
          bgColor="blue.200"
          isDisabled={!isDirty || (!isValid && !isSubmitting)}
          isLoading={isLoading || isSubmitting}
        />

        <ActionButton
          type="button"
          size="lg"
          title="Cancel"
          bgColor="primary"
          color="black"
          onClick={onCancel}
        />
      </Flex>
    </Flex>
  );
};

export default memo(ControlForm);
