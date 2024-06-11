import {
  ChangeEvent,
  ReactNode,
  memo,
  useCallback,
  forwardRef,
  ForwardedRef,
} from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';

type TInputFieldProps = Omit<InputProps, 'onChange'> & {
  type?: 'text' | 'datetime-local' | 'email' | 'password';
  isValidate?: boolean;
  isError?: boolean;
  errorMessages?: string;
  label?: string;
  leftIcon?: ReactNode;
  onChange: (value: string) => void;
};

const InputField = (
  {
    isError = false,
    errorMessages = 'Default error',
    type = 'text',
    label,
    leftIcon,
    onChange,
    ...rest
  }: TInputFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => onChange(e.target.value),
    [onChange],
  );

  return (
    <FormControl isInvalid={isError} {...rest}>
      {label && (
        <FormLabel
          fontSize="base"
          fontWeight="regular"
          marginInlineEnd={0}
          minW="max-content"
        >
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none">{leftIcon}</InputLeftElement>
        )}

        <Input
          py={5}
          type={type}
          color="text.primary"
          onChange={handleChangeValue}
          ref={ref}
          {...rest}
          isInvalid={isError}
          _focus={{ border: '1px solid', borderColor: 'blue.100' }}
        />
      </InputGroup>
      {isError && (
        <FormErrorMessage fontSize="2xs">{errorMessages}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default memo(forwardRef(InputField));
