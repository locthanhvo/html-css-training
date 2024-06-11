import { memo, useCallback } from 'react';
import { Flex } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

// Components
import { InputField, ActionButton } from '@/components';

// Types
import { TUser } from '@/types';

// Utils
import { displayFieldUserForm, formatDateString } from '@/utils';
import { STATUS } from '@/constants';

interface UserFormProps {
  isEdit?: boolean;
  isLoading?: boolean;
  initialValues?: TUser;
  onSubmit: (data: TUser) => void;
}

const UserForm = ({
  initialValues,
  isLoading = false,
  isEdit = false,
  onSubmit,
}: UserFormProps) => {
  const {
    control,
    formState: { isSubmitting, isValid, isDirty },
    handleSubmit,
    clearErrors,
  } = useForm<TUser>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: initialValues?.email ?? '',
      phone: initialValues?.phone ?? '',
      password: initialValues?.password ?? '',
      firstName: initialValues?.firstName ?? '',
      lastName: initialValues?.lastName ?? '',
      status: initialValues?.status ?? STATUS.VALID,
      ...(isEdit && {
        createdAt:
          formatDateString(initialValues?.createdAt) ||
          formatDateString(new Date().toISOString()),
        updatedAt:
          formatDateString(initialValues?.updatedAt) ||
          formatDateString(new Date().toISOString()),
      }),
    },
  });

  const handleInputChange = useCallback(
    ({
      field,
      data,
      isError,
      onChange,
    }: {
      field: keyof TUser;
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
      direction="column"
      gap={4}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex gap={3}>
        {displayFieldUserForm(isEdit)
          .slice(0, 2)
          .map(({ name, rules, type, label, placeholder, ariaLabel }) => (
            <Controller
              key={name}
              control={control}
              rules={rules}
              name={name}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  isDisabled={isSubmitting}
                  onChange={(data) =>
                    handleInputChange({
                      field: name,
                      data,
                      isError: !!error,
                      onChange: field.onChange,
                    })
                  }
                  aria-label={ariaLabel}
                />
              )}
            />
          ))}
      </Flex>

      <Flex gap={3}>
        {displayFieldUserForm(isEdit)
          .slice(2, 4)
          .map(({ name, rules, type, label, placeholder, ariaLabel }) => (
            <Controller
              key={name}
              control={control}
              rules={rules}
              name={name}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  isDisabled={isSubmitting}
                  onChange={(data) =>
                    handleInputChange({
                      field: name,
                      data,
                      isError: !!error,
                      onChange: field.onChange,
                    })
                  }
                  aria-label={ariaLabel}
                />
              )}
            />
          ))}
      </Flex>

      <Flex gap={3}>
        {displayFieldUserForm(isEdit)
          .slice(4, 6)
          .map(({ name, rules, type, label, placeholder, ariaLabel }) => (
            <Controller
              key={name}
              control={control}
              rules={rules}
              name={name}
              render={({ field, fieldState: { error } }) => (
                <InputField
                  type={type}
                  label={label}
                  placeholder={placeholder}
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  isDisabled={true}
                  onChange={(data) =>
                    handleInputChange({
                      field: name,
                      data,
                      isError: !!error,
                      onChange: field.onChange,
                    })
                  }
                  aria-label={ariaLabel}
                />
              )}
            />
          ))}
      </Flex>

      <ActionButton
        type="submit"
        size="lg"
        title={isEdit ? 'Update' : 'Create'}
        bgColor="blue.200"
        isDisabled={!isDirty || (!isValid && !isSubmitting)}
        isLoading={isLoading || isSubmitting}
      />
    </Flex>
  );
};

export default memo(UserForm);
