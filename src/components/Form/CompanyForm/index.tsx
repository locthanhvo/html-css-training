import { memo, useCallback } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

// Components
import { InputField, ActionButton, Dropdown } from '@/components';

// Types
import { TCompany } from '@/types';

// Utils
import { displayFieldCompanyForm, formatDateString } from '@/utils';
import { BRANCHES, CITIES, COUNTRY } from '@/constants';

interface CompanyFormProps {
  isEdit?: boolean;
  isLoading?: boolean;
  initialValues?: TCompany;
  onSubmit: (data: TCompany) => void;
  onCancel?: () => void;
}

const CompanyForm = ({
  initialValues,
  isLoading = false,
  isEdit = false,
  onSubmit,
  onCancel,
}: CompanyFormProps) => {
  const {
    control,
    formState: { isSubmitting, isValid, isDirty },
    handleSubmit,
    clearErrors,
  } = useForm<TCompany>({
    reValidateMode: 'onChange',
    defaultValues: {
      company: initialValues?.company ?? '',
      phone: initialValues?.phone ?? '',
      branch: initialValues?.branch ?? BRANCHES[0].value,
      city: initialValues?.city ?? CITIES[0].value,
      commissioner: initialValues?.commissioner ?? '',
      website: initialValues?.website ?? '',
      country: initialValues?.country ?? COUNTRY[0].value,
      mainEmail: initialValues?.mainEmail ?? '',
      secondaryEmail: initialValues?.secondaryEmail ?? '',
      gpsLatitude: initialValues?.gpsLatitude ?? '',
      gpsLongitude: initialValues?.gpsLongitude ?? '',
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
      field: keyof TCompany;
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
        {isEdit ? 'Edit Company' : 'Add Company'}
      </Text>

      <Flex direction="column" gap={4} flexWrap="wrap" maxHeight="536px">
        {displayFieldCompanyForm().map(
          ({
            name,
            rules,
            type,
            label,
            placeholder,
            ariaLabel,
            elementType,
          }) => (
            <Controller
              key={name}
              control={control}
              rules={rules}
              name={name}
              render={({ field, fieldState: { error } }) => {
                return elementType === 'dropdown' ? (
                  <Flex direction="column">
                    <Text
                      fontSize="base"
                      fontWeight="regular"
                      marginInlineEnd={0}
                      minW="max-content"
                      mb={2}
                    >
                      {label}
                    </Text>

                    <Dropdown
                      options={
                        name === 'branch'
                          ? BRANCHES
                          : name === 'city'
                            ? CITIES
                            : COUNTRY
                      }
                      defaultValue={initialValues?.[name]}
                      onSelect={(data) =>
                        handleInputChange({
                          field: name,
                          data,
                          isError: !!error,
                          onChange: field.onChange,
                        })
                      }
                    />
                  </Flex>
                ) : (
                  <InputField
                    maxW={520}
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
                );
              }}
            />
          ),
        )}
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

export default memo(CompanyForm);
