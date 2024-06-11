import { memo, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

// Components
import {
  InputField,
  ActionButton,
  TextareaField,
  Dropdown,
} from '@/components';

// Types
import { TBrigade } from '@/types';

// Utils
import { formatDateString } from '@/utils';

// Constants
import { BRIGADE_ROLE, BRIGADE_SCHEMA } from '@/constants';

interface BrigadeFormProps {
  title?: string;
  isEdit?: boolean;
  isLoading?: boolean;
  initialValues?: TBrigade;
  onSubmit: (data: TBrigade) => void;
  onCancel?: () => void;
}

const BrigadeForm = ({
  title = 'Add Brigade',
  initialValues,
  isLoading = false,
  isEdit = false,
  onSubmit,
  onCancel,
}: BrigadeFormProps) => {
  const {
    control,
    formState: { isSubmitting, isValid, isDirty },
    handleSubmit,
    clearErrors,
  } = useForm<TBrigade>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: initialValues?.name ?? '',
      description: initialValues?.description ?? '',
      commissioner: initialValues?.commissioner ?? '',
      role: initialValues?.role ?? 'admin',
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
      field: keyof TBrigade;
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
          rules={BRIGADE_SCHEMA.NAME}
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
          rules={BRIGADE_SCHEMA.DESCRIPTION}
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

        <Controller
          key="commissioner"
          control={control}
          rules={BRIGADE_SCHEMA.COMMISSIONER}
          name="commissioner"
          render={({ field, fieldState: { error } }) => (
            <InputField
              label="Commissioner"
              placeholder="Please enter commissioner"
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              isDisabled={isSubmitting}
              onChange={(data) =>
                handleInputChange({
                  field: 'commissioner',
                  data,
                  isError: !!error,
                  onChange: field.onChange,
                })
              }
              aria-label="commissioner"
            />
          )}
        />

        <Controller
          key="role"
          control={control}
          rules={BRIGADE_SCHEMA.ROLE}
          name="role"
          render={({ field, fieldState: { error } }) => (
            <Flex direction="column">
              <Text
                fontSize="base"
                fontWeight="regular"
                marginInlineEnd={0}
                minW="max-content"
                mb={2}
              >
                Role
              </Text>

              <Dropdown
                width="full"
                options={BRIGADE_ROLE}
                defaultValue={initialValues?.role}
                onSelect={(data) =>
                  handleInputChange({
                    field: 'role',
                    data,
                    isError: !!error,
                    onChange: field.onChange,
                  })
                }
              />
            </Flex>
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

export default memo(BrigadeForm);
