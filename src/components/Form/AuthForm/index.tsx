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
  onSubmit: (data: TAuthForm) => void;
}

const AuthForm = ({ isRegister = false, onSubmit }: AuthFormProps) => {
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

  const handleClearErrorMessage = useCallback(
    ({
      field,
      isError,
      onChange,
    }: {
      field: keyof TAuthForm;
      isError: boolean;
      onChange: (value: string) => void;
    }) =>
      (data: string) => {
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
      {displayFieldAuthForm(isRegister).map((fieldConfig: any) => (
        <Controller
          key={fieldConfig.name}
          control={control}
          rules={fieldConfig.rules}
          name={fieldConfig.name}
          render={({ field, fieldState: { error } }) => (
            <InputField
              type={fieldConfig.type}
              label={fieldConfig.label}
              placeholder={fieldConfig.placeholder}
              {...field}
              isError={!!error}
              errorMessages={error?.message}
              isDisabled={isSubmitting}
              onChange={handleClearErrorMessage({
                field: fieldConfig.name,
                isError: !!error,
                onChange: field.onChange,
              })}
              aria-label={fieldConfig.ariaLabel}
            />
          )}
        />
      ))}

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
        isLoading={isSubmitting}
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
