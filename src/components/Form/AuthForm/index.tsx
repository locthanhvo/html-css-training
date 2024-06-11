import { ChangeEvent, memo, useCallback } from 'react';
import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// Components
import { ForwardIcon } from '@/components/Icons';
import { InputField, ActionButton } from '@/components';

// Constants
import { AUTH_SCHEMA, PUBLIC_ROUTERS } from '@/constants';

// Types
import { TAuthForm } from '@/types';
import { displayFieldAuthForm } from '@/utils';

interface AuthFormProps {
  isRegister?: boolean;
  isLoading?: boolean;
  onSubmit: (data: TAuthForm) => void;
}

const AuthForm = ({
  isLoading = false,
  isRegister = false,
  onSubmit,
}: AuthFormProps) => {
  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    clearErrors,
  } = useForm<TAuthForm>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      ...(isRegister && {
        phone: '',
        confirmPassword: '',
        isAcceptPrivacyPolicy: false,
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
      field: keyof TAuthForm;
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
      {displayFieldAuthForm(isRegister).map(
        ({ name, rules, type, label, placeholder, ariaLabel }) => (
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
        ),
      )}

      {isRegister ? (
        <Controller
          control={control}
          rules={AUTH_SCHEMA.AGREE_POLICY}
          name="isAcceptPrivacyPolicy"
          render={({ field: { value, onChange } }) => (
            <Checkbox
              isChecked={value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange(e.target.checked)
              }
            >
              <Text fontSize="base" fontWeight="regular">
                I accept{' '}
                <Text as="span" color="blue.300">
                  the terms and conditions of use.
                </Text>
              </Text>
            </Checkbox>
          )}
        />
      ) : (
        <Text textAlign="center" fontSize="base" fontWeight="regular">
          Forgot your password ?
        </Text>
      )}

      <ActionButton
        type="submit"
        size="xl"
        title={isRegister ? 'Sign Up' : 'Sign In'}
        bgColor="blue.200"
        rightIcon={!isRegister ? <ForwardIcon /> : undefined}
        isDisabled={!isValid && !isSubmitting}
        isLoading={isLoading || isSubmitting}
      />

      <Text textAlign="center" fontSize="base" fontWeight="regular">
        {isRegister ? (
          <>
            Already have an account?
            <Link to={PUBLIC_ROUTERS.SIGN_IN} color="blue.300">
              <Text as="span" color="blue.300">
                {' '}
                To log in
              </Text>
            </Link>
          </>
        ) : (
          <>
            You do not have an account ?
            <Link to={PUBLIC_ROUTERS.SIGN_UP}>
              <Text as="span" color="blue.300">
                {' '}
                Create an account
              </Text>
            </Link>
          </>
        )}
      </Text>
    </Flex>
  );
};

export default memo(AuthForm);
